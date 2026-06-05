/**
 * 🔴 V2 IMPROVEMENT: Monitoring & Alertes
 * Alerte sur anomalies: Fraude F1 < 75%, Recherche P95 > 150ms, etc.
 */

import { normalizeCacheKey, cacheSet, cacheGet } from '@/lib/cache/redis';

export interface MetricsPoint {
  timestamp: number;
  value: number;
  threshold?: number;
}

export interface AlertConfig {
  metric: string;
  threshold: number;
  comparison: 'lt' | 'gt' | 'eq';
  severity: 'info' | 'warning' | 'critical';
  ttlSeconds?: number;
}

export interface Alert {
  id: string;
  metric: string;
  value: number;
  threshold: number;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: number;
  triggered: boolean;
}

/**
 * Configuration des seuils de monitoring
 */
export const MONITORING_THRESHOLDS: Record<string, AlertConfig> = {
  // Fraude Detection (v2 optimisé)
  'fraud_f1_score': {
    metric: 'fraud_f1_score',
    threshold: 75,
    comparison: 'lt',
    severity: 'critical',
  },
  'fraud_recall': {
    metric: 'fraud_recall',
    threshold: 75,
    comparison: 'lt',
    severity: 'critical',
  },
  'fraud_precision': {
    metric: 'fraud_precision',
    threshold: 95,
    comparison: 'lt',
    severity: 'warning',
  },
  'fraud_latency': {
    metric: 'fraud_latency',
    threshold: 50,
    comparison: 'gt',
    severity: 'warning',
  },

  // Search (avec cache Redis)
  'search_p95_latency': {
    metric: 'search_p95_latency',
    threshold: 150,
    comparison: 'gt',
    severity: 'warning',
  },
  'search_p99_latency': {
    metric: 'search_p99_latency',
    threshold: 200,
    comparison: 'gt',
    severity: 'critical',
  },
  'cache_hit_rate': {
    metric: 'cache_hit_rate',
    threshold: 40,
    comparison: 'lt',
    severity: 'info',
  },

  // Ranking
  'ranking_p95_latency': {
    metric: 'ranking_p95_latency',
    threshold: 50,
    comparison: 'gt',
    severity: 'warning',
  },

  // System
  'error_rate': {
    metric: 'error_rate',
    threshold: 1,
    comparison: 'gt',
    severity: 'critical',
  },
};

class MonitoringSystem {
  private metrics: Map<string, MetricsPoint[]> = new Map();
  private alerts: Map<string, Alert> = new Map();
  private maxHistoryPoints = 1000;

  /**
   * Enregistrer une métrique
   */
  async recordMetric(name: string, value: number): Promise<void> {
    const key = normalizeCacheKey('metric', name);
    const point: MetricsPoint = {
      timestamp: Date.now(),
      value,
    };

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    const history = this.metrics.get(name)!;
    history.push(point);

    // Garder seulement les N derniers points
    if (history.length > this.maxHistoryPoints) {
      history.shift();
    }

    // Persister en cache
    try {
      await cacheSet(key, history, 86400); // 24h TTL
    } catch (err) {
      console.error(`[Monitoring] Erreur sauvegarde métrique ${name}:`, err);
    }

    // Vérifier les seuils
    await this.checkThresholds(name, value);
  }

  /**
   * Vérifier si une métrique dépasse les seuils
   */
  private async checkThresholds(metricName: string, value: number): Promise<void> {
    const config = MONITORING_THRESHOLDS[metricName];
    if (!config) return;

    let triggered = false;

    if (config.comparison === 'lt') {
      triggered = value < config.threshold;
    } else if (config.comparison === 'gt') {
      triggered = value > config.threshold;
    } else if (config.comparison === 'eq') {
      triggered = value === config.threshold;
    }

    if (triggered) {
      const alert: Alert = {
        id: `${metricName}_${Date.now()}`,
        metric: metricName,
        value,
        threshold: config.threshold,
        severity: config.severity,
        message: this.formatAlertMessage(metricName, value, config.threshold),
        timestamp: Date.now(),
        triggered: true,
      };

      this.alerts.set(alert.id, alert);
      await this.sendAlert(alert);
    }
  }

  /**
   * Formater le message d'alerte
   */
  private formatAlertMessage(
    metric: string,
    value: number,
    threshold: number
  ): string {
    const config = MONITORING_THRESHOLDS[metric];
    if (!config) return `Métrique ${metric}: ${value}`;

    const comparison =
      config.comparison === 'lt' ? 'inférieur à'
      : config.comparison === 'gt' ? 'supérieur à'
      : 'égal à';

    return `[${metric}] ${value.toFixed(2)} ${comparison} ${threshold}`;
  }

  /**
   * Envoyer une alerte (Email, Slack, Datadog, etc.)
   */
  private async sendAlert(alert: Alert): Promise<void> {
    const { severity, message, timestamp } = alert;
    const timeStr = new Date(timestamp).toISOString();

    // Log
    const logFn = severity === 'critical' ? console.error
                : severity === 'warning' ? console.warn
                : console.log;
    logFn(`[${severity.toUpperCase()}] ${message} (${timeStr})`);

    // Email (production)
    if (severity === 'critical' && process.env.ALERT_EMAIL) {
      await this.sendEmail(alert);
    }

    // Slack (production)
    if (process.env.SLACK_WEBHOOK_URL) {
      await this.sendSlack(alert);
    }

    // Datadog (production)
    if (process.env.DATADOG_API_KEY) {
      await this.sendDatadog(alert);
    }
  }

  /**
   * Envoyer alerte par email
   */
  private async sendEmail(alert: Alert): Promise<void> {
    try {
      // TODO: Intégrer Resend ou SendGrid
      console.log(`[Email] Alerte ${alert.metric}: ${alert.message}`);
    } catch (err) {
      console.error('[Email] Erreur envoi email:', err);
    }
  }

  /**
   * Envoyer alerte à Slack
   */
  private async sendSlack(alert: Alert): Promise<void> {
    try {
      const webhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (!webhookUrl) return;

      const color = alert.severity === 'critical' ? 'danger'
                  : alert.severity === 'warning' ? 'warning'
                  : 'good';

      const payload = {
        attachments: [{
          color,
          title: `🚨 ${alert.severity.toUpperCase()}: ${alert.metric}`,
          text: alert.message,
          fields: [
            { title: 'Value', value: alert.value.toString(), short: true },
            { title: 'Threshold', value: alert.threshold.toString(), short: true },
          ],
          ts: Math.floor(alert.timestamp / 1000),
        }],
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('[Slack] Erreur envoi alerte:', err);
    }
  }

  /**
   * Envoyer alerte à Datadog
   */
  private async sendDatadog(alert: Alert): Promise<void> {
    try {
      const apiKey = process.env.DATADOG_API_KEY;
      if (!apiKey) return;

      const payload = {
        title: `${alert.metric} threshold exceeded`,
        text: `${alert.message}\nValue: ${alert.value}, Threshold: ${alert.threshold}`,
        priority: alert.severity === 'critical' ? 'high' : 'normal',
        tags: [
          `metric:${alert.metric}`,
          `severity:${alert.severity}`,
        ],
      };

      await fetch('https://api.datadoghq.com/api/v1/events', {
        method: 'POST',
        headers: {
          'DD-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('[Datadog] Erreur envoi alerte:', err);
    }
  }

  /**
   * Obtenir les métriques d'une période
   */
  async getMetricHistory(name: string, hoursBack: number = 24): Promise<MetricsPoint[]> {
    const key = normalizeCacheKey('metric', name);
    
    try {
      const cached = await cacheGet<MetricsPoint[]>(key);
      if (cached) {
        const cutoff = Date.now() - hoursBack * 60 * 60 * 1000;
        return cached.filter(p => p.timestamp >= cutoff);
      }
    } catch (err) {
      console.error(`[Monitoring] Erreur récupération historique ${name}:`, err);
    }

    return this.metrics.get(name)?.slice(-100) ?? [];
  }

  /**
   * Obtenir les alertes récentes
   */
  getRecentAlerts(minutesBack: number = 60): Alert[] {
    const cutoff = Date.now() - minutesBack * 60 * 1000;
    return Array.from(this.alerts.values())
      .filter(a => a.timestamp >= cutoff)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Obtenir les statistiques globales
   */
  async getStats() {
    return {
      metricsTracked: this.metrics.size,
      alertsTriggered: this.alerts.size,
      recentAlerts: this.getRecentAlerts(60),
      metricsData: Object.fromEntries(
        Array.from(this.metrics.entries())
          .map(([name, points]) => [
            name,
            {
              count: points.length,
              latest: points[points.length - 1] || null,
              avg: points.length > 0
                ? points.reduce((sum, p) => sum + p.value, 0) / points.length
                : 0,
            },
          ])
      ),
    };
  }
}

// Export singleton
export const monitoring = new MonitoringSystem();
