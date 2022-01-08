import { EnquiryStatus, ServiceStatus } from '../types/travel';

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyPrecise(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getStatusBadgeConfig(status: EnquiryStatus | ServiceStatus | string): {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (status) {
    case 'new':
    case 'draft':
      return {
        label: status === 'new' ? 'New Enquiry' : 'Draft',
        bg: 'bg-sky-950/60',
        text: 'text-sky-300',
        border: 'border-sky-800/60',
        dot: 'bg-sky-400',
      };
    case 'quoted':
      return {
        label: 'Quoted',
        bg: 'bg-indigo-950/60',
        text: 'text-indigo-300',
        border: 'border-indigo-800/60',
        dot: 'bg-indigo-400',
      };
    case 'accepted':
      return {
        label: 'Accepted',
        bg: 'bg-teal-950/60',
        text: 'text-teal-300',
        border: 'border-teal-800/60',
        dot: 'bg-teal-400',
      };
    case 'requested':
      return {
        label: 'Supplier Requested',
        bg: 'bg-amber-950/60',
        text: 'text-amber-300',
        border: 'border-amber-800/60',
        dot: 'bg-amber-400 animate-pulse',
      };
    case 'partially_booked':
      return {
        label: 'Partially Booked',
        bg: 'bg-amber-950/40',
        text: 'text-amber-200',
        border: 'border-amber-700/60',
        dot: 'bg-amber-400',
      };
    case 'confirmed':
    case 'fully_booked':
      return {
        label: status === 'fully_booked' ? 'Fully Booked' : 'Confirmed',
        bg: 'bg-emerald-950/60',
        text: 'text-emerald-300',
        border: 'border-emerald-800/60',
        dot: 'bg-emerald-400',
      };
    case 'cancelled':
    case 'lost':
      return {
        label: status === 'lost' ? 'Lost' : 'Cancelled',
        bg: 'bg-rose-950/60',
        text: 'text-rose-300',
        border: 'border-rose-800/60',
        dot: 'bg-rose-400',
      };
    default:
      return {
        label: status,
        bg: 'bg-slate-800',
        text: 'text-slate-300',
        border: 'border-slate-700',
        dot: 'bg-slate-400',
      };
  }
}

export function getServiceTypeColor(type: 'flight' | 'hotel' | 'restaurant') {
  switch (type) {
    case 'flight':
      return {
        accent: 'text-sky-400',
        bg: 'bg-sky-500/10',
        border: 'border-sky-500/30',
        pill: 'bg-sky-950 border-sky-800 text-sky-300',
      };
    case 'hotel':
      return {
        accent: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        pill: 'bg-purple-950 border-purple-800 text-purple-300',
      };
    case 'restaurant':
      return {
        accent: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        pill: 'bg-amber-950 border-amber-800 text-amber-300',
      };
  }
}
