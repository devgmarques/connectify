import { cn } from '@/lib'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-white dark:bg-muted',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
