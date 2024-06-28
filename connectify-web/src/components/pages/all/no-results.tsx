type NoResultsProps = {
  message: string
}

export function NoResults({ message }: NoResultsProps) {
  return (
    <section className="w-full mt-5 px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
      <h2 className="text-foreground text-medium mb-2 text-xl">{message}</h2>
      <p className="text-base text-foreground/70">
        Tente diminuir ou reescrever seus termos de pesquisa.
      </p>
    </section>
  )
}
