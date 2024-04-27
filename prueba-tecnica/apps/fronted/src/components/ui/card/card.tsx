type Props = { item: Record<string, string> }

export default function Card ({ item }: Props) {
  return (
    <article className="card">
      {Object.entries(item).map(([key, value]) => (
        <p key={`prop-${key}`}><strong>{key}</strong>: {value}</p>
      ))}
    </article>
  )
}
