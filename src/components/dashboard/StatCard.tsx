
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowDown, ArrowUp } from 'lucide-react';

const statCardVariants = cva(
  "rounded-xl p-6 bg-white border shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/10 bg-primary/5",
        success: "border-pharma-green/10 bg-pharma-green/5",
        warning: "border-pharma-orange/10 bg-pharma-orange/5",
        danger: "border-pharma-red/10 bg-pharma-red/5",
        info: "border-pharma-blue/10 bg-pharma-blue/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  variant,
  className,
}: StatCardProps) {
  const isTrendPositive = trend && trend > 0;
  const isTrendNegative = trend && trend < 0;
  const trendValue = trend ? Math.abs(trend) : null;

  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-display font-bold">{value}</h3>
        </div>
        <div className={cn(
          "p-2.5 rounded-lg", 
          variant === "primary" && "bg-primary/10 text-primary",
          variant === "success" && "bg-pharma-green/10 text-pharma-green",
          variant === "warning" && "bg-pharma-orange/10 text-pharma-orange",
          variant === "danger" && "bg-pharma-red/10 text-pharma-red",
          variant === "info" && "bg-pharma-blue/10 text-pharma-blue",
          variant === "default" && "bg-muted text-muted-foreground",
        )}>
          {icon}
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="flex items-center mt-3">
          {isTrendPositive && (
            <div className="flex items-center text-pharma-green">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span className="text-xs font-medium">{trendValue}%</span>
            </div>
          )}
          {isTrendNegative && (
            <div className="flex items-center text-pharma-red">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span className="text-xs font-medium">{trendValue}%</span>
            </div>
          )}
          {trendLabel && (
            <span className="text-xs text-muted-foreground ml-1">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
