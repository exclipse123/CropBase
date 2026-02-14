import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'success';
}

export function EmptyState({ icon: Icon, title, description, action, variant = 'default' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className={`rounded-full p-4 mb-4 ${
        variant === 'success' 
          ? 'bg-green-100' 
          : 'bg-neutral-100'
      }`}>
        <Icon className={`h-8 w-8 ${
          variant === 'success'
            ? 'text-green-600'
            : 'text-neutral-400'
        }`} />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm max-w-md mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
