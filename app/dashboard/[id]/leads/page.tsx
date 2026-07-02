'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { getLeadActions, updateOrderStatus } from '@/lib/actions/leads';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingCart,
  Calendar,
  TrendingUp,
  Filter,
  Loader2,
  Phone,
  Check,
  X as XIcon,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldQuestion,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateBookingStatus } from '@/lib/actions/reservation';
import { toast } from 'sonner';
import { blockUser } from '@/lib/actions/friendships';
import { analyzeFraud, saveFraudAnalysis } from '@/lib/actions/fraud-detection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type LeadType = 'all' | 'order' | 'booking';

export default function LeadsPage() {
  const params = useParams();
  const storeId = Number(params.id);

  const [leads, setLeads] = useState<{ orders: any[]; bookings: any[] }>({ orders: [], bookings: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<LeadType>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const [updatingIds, setUpdatingIds] = useState<Record<number, boolean>>({});

  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [isFraudDialogOpen, setIsFraudDialogOpen] = useState(false);
  const [isAnalyzingFraud, setIsAnalyzingFraud] = useState(false);

  const handleAnalyzeFraud = async (lead: any) => {
    setSelectedLead(lead);
    setIsFraudDialogOpen(true);

    // If fraud details are already calculated and saved, no need to rerun
    if (lead.fraud) return;

    setIsAnalyzingFraud(true);
    try {
      const context = {
        customer_id: lead.customer_id,
        store_id: storeId,
        item_id: lead.items?.id || 0,
        quantity: lead.quantity || 1,
        total: lead.amount,
        delivery_address: lead.delivery_address || '',
        entity_type: lead.leadType === 'order' ? 'ORDER' as const : 'BOOKING' as const
      };

      const analysis = await analyzeFraud(context);
      
      // Save to DB
      await saveFraudAnalysis(lead.id, analysis, context.entity_type);

      // Update local state so lead now has fraud data
      const updatedFraud = {
        score: analysis.score,
        level: analysis.level,
        recommendation: analysis.recommendation,
        ai_reasoning: analysis.ai_reasoning,
        signals: analysis.signals
      };

      setLeads(prev => ({
        orders: lead.leadType === 'order'
          ? prev.orders.map(o => o.id === lead.id ? { ...o, fraud: updatedFraud } : o)
          : prev.orders,
        bookings: lead.leadType === 'booking'
          ? prev.bookings.map(b => b.id === lead.id ? { ...b, fraud: updatedFraud } : b)
          : prev.bookings
      }));

      // Update selected lead details in modal
      setSelectedLead((prev: any) => prev ? { ...prev, fraud: updatedFraud } : null);
      toast.success("Analyse de fraude complétée avec succès");
    } catch (err: any) {
      console.error(err);
      toast.error("Échec de l'analyse de fraude : " + (err.message || "Erreur inconnue"));
    } finally {
      setIsAnalyzingFraud(false);
    }
  };

  const fetchData = () => {
    if (storeId) {
      getLeadActions(storeId).then(data => {
        setLeads(data as any);
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [storeId]);

  const handleStatusUpdate = async (leadId: number, type: 'order' | 'booking', newStatus: string) => {
    // Generate unique key for loading state
    const key = `${type}-${leadId}`;
    setUpdatingIds(prev => ({ ...prev, [leadId]: true })); // We can still use leadId as key or type-id
    
    try {
      if (type === 'booking') {
        await updateBookingStatus(leadId, newStatus as any);
        toast.success(newStatus === 'CONFIRMED' ? 'Réservation acceptée' : 'Réservation refusée');
      } else {
        await updateOrderStatus(leadId, newStatus as any);
        toast.success(newStatus === 'VALIDATED' ? 'Commande validée' : 'Commande refusée');
      }
      
      // Update local state
      setLeads(prev => ({
        orders: type === 'order' 
          ? prev.orders.map(o => o.id === leadId ? { ...o, status: newStatus } : o)
          : prev.orders,
        bookings: type === 'booking'
          ? prev.bookings.map(b => b.id === leadId ? { ...b, status: newStatus } : b)
          : prev.bookings
      }));
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la mise à jour");
    } finally {
      setUpdatingIds(prev => ({ ...prev, [leadId]: false }));
    }
  };

  const handleBlockCustomer = async (customerId: string, leadId: number, type: 'order' | 'booking') => {
    if (!customerId) {
      toast.error("Impossible de bloquer : ID client manquant");
      return;
    }
    
    if (window.confirm("Voulez-vous bloquer ce client et annuler sa demande ?")) {
      setUpdatingIds(prev => ({ ...prev, [leadId]: true }));
      try {
        const { error } = await blockUser(customerId);
        if (error) throw error;
        
        // Also cancel the order/booking
        if (type === 'booking') {
          await updateBookingStatus(leadId, 'CANCELLED');
        } else {
          await updateOrderStatus(leadId, 'CANCELLED');
        }
        
        toast.success("Client bloqué et demande annulée");
        fetchData();
      } catch (err: any) {
        toast.error("Erreur: " + (err.message || "Action impossible"));
      } finally {
        setUpdatingIds(prev => ({ ...prev, [leadId]: false }));
      }
    }
  };

  const allLeads = useMemo(() => {
    const combined = [
      ...leads.orders.map(o => ({ ...o, leadType: 'order' as const, amount: o.total_price })),
      ...leads.bookings.map(b => ({ ...b, leadType: 'booking' as const, amount: b.price })),
    ];

    // On ne garde QUE les actions en attente (PENDING)
    let filtered = combined.filter(l => l.status === 'PENDING');

    if (filterType !== 'all') {
      filtered = filtered.filter(l => l.leadType === filterType);
    }
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === 'recent' ? dateB - dateA : dateA - dateB;
    });
  }, [leads, filterType, sortBy]);

  if (isLoading) return <div className="p-8 text-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Chargement des leads...</div>;

  const pendingOrders = leads.orders.filter(o => o.status === 'PENDING').length;
  const pendingBookings = leads.bookings.filter(b => b.status === 'PENDING').length;
  const ordersCount = pendingOrders;
  const bookingsCount = pendingBookings;

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Actions clients & Leads</h1>
        <p className="text-muted-foreground">Suivez vos commandes et réservations en temps réel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType('all')}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Total interactions</p>
                <p className="text-3xl font-bold text-foreground">{ordersCount + bookingsCount}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"><TrendingUp className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType('order')}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Commandes</p>
                <p className="text-3xl font-bold text-foreground">{ordersCount}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"><ShoppingCart className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType('booking')}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Réservations</p>
                <p className="text-3xl font-bold text-foreground">{bookingsCount}</p>
              </div>
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"><Calendar className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2 items-center w-full md:w-auto">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <Select value={filterType} onValueChange={(val) => setFilterType(val as LeadType)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tout</SelectItem>
              <SelectItem value="order">Commandes</SelectItem>
              <SelectItem value="booking">Réservations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant={sortBy === 'recent' ? 'default' : 'outline'} onClick={() => setSortBy('recent')}>Plus récent</Button>
          <Button variant={sortBy === 'oldest' ? 'default' : 'outline'} onClick={() => setSortBy('oldest')}>Plus ancien</Button>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {allLeads.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Aucune interaction client pour le moment.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          allLeads.map((lead) => (
            <Card key={`${lead.leadType}-${lead.id}`} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg shrink-0 ${lead.leadType === 'order' ? 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400' : 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400'}`}>
                    {lead.leadType === 'order' ? <ShoppingCart className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                      <div className="space-y-1">
                        <h3 className="font-bold text-foreground flex items-center gap-2">
                          {lead.leadType === 'order' ? 'Commande' : 'Réservation'}
                          <span className="text-[10px] font-black px-2 py-0.5 bg-muted rounded uppercase tracking-widest opacity-70">#{lead.id}</span>
                        </h3>
                        <p className="text-sm text-foreground font-black uppercase italic tracking-tighter">{lead.customer_name}</p>
                        {lead.customer_phone && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 opacity-80">
                            <Phone className="w-3 h-3" /> {lead.customer_phone}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2 border-l-2 border-primary/20 pl-3">
                          Montant : <span className="font-black text-foreground">{lead.amount} DT</span>
                        </p>

                        {/* Fraud Signals */}
                        {lead.fraud && (
                          <div className="mt-4 p-3 bg-muted/30 rounded-xl border border-border/50">
                            <div className="flex items-center gap-2 mb-2">
                              <ShieldAlert className={`w-4 h-4 ${
                                lead.fraud.level === 'safe' ? 'text-emerald-500' :
                                lead.fraud.level === 'suspicious' ? 'text-amber-500' :
                                'text-rose-500'
                              }`} />
                              <span className={`text-[10px] font-black uppercase tracking-widest ${
                                lead.fraud.level === 'safe' ? 'text-emerald-600' :
                                lead.fraud.level === 'suspicious' ? 'text-amber-600' :
                                'text-rose-600'
                              }`}>
                                Analyse de risque : {lead.fraud.level.replace('_', ' ')} ({lead.fraud.score}/100)
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                              "{lead.fraud.ai_reasoning}"
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-3 text-right">
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-foreground">
                            {new Intl.DateTimeFormat('fr-FR', { month: 'short', day: 'numeric' }).format(new Date(lead.created_at))}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em] opacity-40">
                            {new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(lead.created_at))}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm ${
                            lead.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            lead.status === 'CANCELLED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            lead.status === 'CONFIRMED' || lead.status === 'VALIDATED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
                          }`}>{lead.status}</span>

                          {lead.status === 'PENDING' && (
                            <div className="flex gap-2 mt-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAnalyzeFraud(lead)}
                                className="h-8 px-3 text-[9px] font-black uppercase tracking-widest border-indigo-500/20 text-indigo-600 hover:bg-indigo-650 hover:text-white transition-all active:scale-95 rounded-lg shadow-sm"
                              >
                                <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                                Analyser Fraude
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(lead.id, lead.leadType, lead.leadType === 'booking' ? 'CONFIRMED' : 'VALIDATED')}
                                disabled={updatingIds[lead.id]}
                                className="h-8 px-3 text-[9px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all active:scale-95 rounded-lg shadow-sm"
                              >
                                {updatingIds[lead.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                Accepter
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(lead.id, lead.leadType, 'CANCELLED')}
                                disabled={updatingIds[lead.id]}
                                className="h-8 px-3 text-[9px] font-black uppercase tracking-widest border-rose-500/20 text-rose-600 hover:bg-rose-600 hover:text-white transition-all active:scale-95 rounded-lg shadow-sm"
                              >
                                {updatingIds[lead.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <XIcon className="w-3 h-3" />}
                                Refuser
                              </Button>
                            </div>
                          )}
                          
                          {lead.customer_id && lead.status !== 'CANCELLED' && lead.status !== 'COMPLETED' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleBlockCustomer(lead.customer_id, lead.id, lead.leadType)}
                              disabled={updatingIds[lead.id]}
                              className="h-8 px-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-all rounded-lg mt-1"
                            >
                              <ShieldAlert className="w-3 h-3 mr-1" />
                              Bloquer Client
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {allLeads.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">Affichage de {allLeads.length} interactions</div>
      )}

      {/* Fraud Detection Details Modal */}
      <Dialog open={isFraudDialogOpen} onOpenChange={setIsFraudDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-zinc-950 border-0 shadow-2xl rounded-3xl p-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-gray-900 dark:text-zinc-50 font-black text-2xl tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Analyse de Risque & Fraude
            </DialogTitle>
            <DialogDescription className="text-zinc-500 dark:text-zinc-400 font-medium">
              Détails de détection de fraude pour {selectedLead?.leadType === 'order' ? 'la commande' : 'la réservation'} #{selectedLead?.id}
            </DialogDescription>
          </DialogHeader>

          {isAnalyzingFraud ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-indigo-600 animate-pulse">
                Calcul du score de risque IA...
              </p>
            </div>
          ) : selectedLead?.fraud ? (
            <div className="space-y-6">
              {/* Risk Level and Meter */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-6 shadow-sm">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Niveau de risque</p>
                  <h4 className={`text-2xl font-black uppercase tracking-tight ${
                    selectedLead.fraud.level === 'safe' ? 'text-emerald-600' :
                    selectedLead.fraud.level === 'suspicious' ? 'text-amber-500' :
                    'text-rose-600'
                  }`}>
                    {selectedLead.fraud.level === 'safe' ? 'SÛR (Safe)' :
                     selectedLead.fraud.level === 'suspicious' ? 'SUSPECT' :
                     selectedLead.fraud.level === 'high_risk' ? 'RISQUE ÉLEVÉ' : 'BLOQUÉ'}
                  </h4>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                    Score: <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedLead.fraud.score}/100</span>
                  </p>
                </div>
                
                {/* Visual circle score indicator */}
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      className="stroke-zinc-200 dark:stroke-zinc-800 fill-none"
                      strokeWidth="6"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      className={`fill-none transition-all duration-1000 ${
                        selectedLead.fraud.level === 'safe' ? 'stroke-emerald-500' :
                        selectedLead.fraud.level === 'suspicious' ? 'stroke-amber-500' :
                        'stroke-rose-500'
                      }`}
                      strokeWidth="6"
                      strokeDasharray={175.9}
                      strokeDashoffset={175.9 - (175.9 * selectedLead.fraud.score) / 100}
                    />
                  </svg>
                  <span className="absolute text-sm font-black text-zinc-900 dark:text-zinc-100">{Math.round(selectedLead.fraud.score)}%</span>
                </div>
              </div>

              {/* Recommendation Badge */}
              <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                selectedLead.fraud.recommendation === 'approve' ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700' :
                selectedLead.fraud.recommendation === 'review' ? 'bg-amber-50/50 border-amber-100 text-amber-700' :
                'bg-rose-50/50 border-rose-100 text-rose-700'
              }`}>
                {selectedLead.fraud.recommendation === 'approve' ? <CheckCircle2 className="w-5 h-5" /> :
                 selectedLead.fraud.recommendation === 'review' ? <AlertTriangle className="w-5 h-5" /> :
                 <ShieldAlert className="w-5 h-5" />}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-75">Recommandation du système</p>
                  <p className="text-sm font-bold uppercase tracking-tight">
                    {selectedLead.fraud.recommendation === 'approve' ? 'Approuver la demande' :
                     selectedLead.fraud.recommendation === 'review' ? 'Vérification manuelle requise' :
                     'Rejeter / Refuser la demande'}
                  </p>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Raisonnement IA (Multi-Couches)
                </h5>
                <div className="p-4 rounded-xl bg-indigo-50/20 border border-indigo-100/10 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                  "{selectedLead.fraud.ai_reasoning}"
                </div>
              </div>

              {/* Heuristic Signals details */}
              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  Signaux heuristiques ({selectedLead.fraud.signals?.length || 0})
                </h5>
                
                {(!selectedLead.fraud.signals || selectedLead.fraud.signals.length === 0) ? (
                  <div className="p-4 text-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400">
                    Aucun signal suspect détecté pour cette transaction.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedLead.fraud.signals.map((sig: any, index: number) => (
                      <div key={index} className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3 shadow-xs">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shrink-0 mt-0.5 ${
                          sig.severity === 'high' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          sig.severity === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-zinc-100 text-zinc-500'
                        }`}>
                          {sig.severity}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{sig.description}</p>
                          <p className="text-[9px] text-zinc-400 uppercase tracking-widest">
                            Impact: +{sig.weight} pts • {sig.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-zinc-400">
              Aucune donnée d'analyse disponible.
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => setIsFraudDialogOpen(false)}
              className="px-6 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-sm"
            >
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
