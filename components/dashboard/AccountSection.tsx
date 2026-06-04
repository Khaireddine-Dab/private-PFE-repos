'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Zap, Crown, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { deleteAccount } from '@/lib/actions/account_subscription';
import { deleteStore } from '@/lib/actions/stores';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

// Plans removed: the app no longer offers selectable plans in the dashboard.

interface AccountSectionProps {
  store: any;
  user: any;
  subscription: any;
  storeId: number;
}

export default function AccountSection({ store, user, subscription, storeId }: AccountSectionProps) {
  const router = useRouter();
  const currentPlan: 'free' | 'pro' | 'business' = subscription?.plan_name?.toLowerCase() || 'free';

  const handleUpgrade = (plan: string) => {
    toast.success(`Mise à niveau vers le forfait ${plan} initiée !`);
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    const { success, error } = await deleteAccount(user.id);
    if (success) {
      toast.success("Votre compte a été supprimé avec succès. Redirection...");
      setTimeout(() => router.push('/'), 1500);
    } else {
      toast.error("Erreur lors de la suppression du compte: " + error);
    }
  };

  const handleDeleteStore = async () => {
    if (!storeId) return;
    try {
      const { success, error } = await deleteStore(storeId);
      if (success) {
        toast.success("Votre boutique a été supprimée. Redirection...");
        setTimeout(() => router.push('/'), 2000);
      } else {
        toast.error("Erreur lors de la suppression de la boutique: " + error);
      }
    } catch (err) {
      toast.error("Une erreur inattendue est survenue.");
    }
  };

  return (
    <div className="space-y-8 mt-12 pt-12 border-t border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-1 h-8 bg-primary rounded-full" />
        <h2 className="text-3xl font-black text-white tracking-tight">Compte & Abonnement</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Info */}
        <Card className="lg:col-span-2 border-0 shadow-2xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10">
          <CardHeader>
            <CardTitle className="text-white">Informations du compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Nom de la boutique</p>
                <p className="text-lg font-bold text-white">{store?.name || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Statut</p>
                <Badge className={store?.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}>
                  {store?.status === 'ACTIVE' ? 'Actif' : 'En attente'}
                </Badge>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Email de contact</p>
                <p className="text-lg font-bold text-white">{user?.email || '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Plan Card */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-2xl ring-1 ring-primary/20 p-1">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">Forfait Actuel</p>
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-black text-white capitalize mb-2">
                {currentPlan === 'free' ? 'Gratuit' : currentPlan === 'pro' ? 'Pro' : 'Business'}
              </h3>
              <p className="text-xl font-bold text-white/60">
                {subscription?.price ? `${subscription.price} DT/mois` : '—'}
              </p>
            </div>
            {subscription?.current_period_end && (
              <p className="text-xs text-white/40 font-medium mt-4">
                Valide jusqu'au {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(subscription.current_period_end))}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Plans removed */}

      {/* Danger Zone */}
      <Card className="border-0 shadow-2xl bg-rose-500/5 backdrop-blur-2xl ring-1 ring-rose-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-rose-500 font-black">
            <AlertCircle className="w-5 h-5" />
            Zone Critique
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 font-medium">Ces actions supprimeront définitivement vos données. Soyez prudent.</p>
          <div className="flex gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 font-bold">
                  Supprimer la boutique
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-900 border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white font-bold">Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/60">
                    Cette action supprimera définitivement votre boutique. Vos données personnelles de compte seront conservées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/5 text-white border-0">Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteStore} className="bg-rose-600 text-white">Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 font-bold underline decoration-rose-500/30">
                  Fermer mon compte
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-900 border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white font-bold text-xl">Action Irréversible</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/60">
                    Vous allez supprimer votre compte utilisateur et TOUTES vos boutiques. Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/5 text-white border-0">Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-rose-600 text-white">Supprimer Définitivement</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
