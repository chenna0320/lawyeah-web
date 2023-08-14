import type { Person } from '../interfaces'

function PersonComponent({ person }: { person: Person }) {
  // console.log("------person", person)
  return (
    <div>
      {person.name}
    </div>
  )
}
export default PersonComponent