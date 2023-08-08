import useSWR from 'swr'
import Link from 'next/link';
import PersonComponent from '../components/Person'
import type { Person } from '../interfaces'
import styles from './styles.module.scss';
import HelloWorld from '../components/hello-world'
import { Button } from 'antd';

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function Index() {
  const { data, error, isLoading } = useSWR<Person[]>('/api/people', fetcher)
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  console.log('data:', data);

  return (
    <div className={styles.container}>
      <h1>Welcome to our website!</h1>
      <HelloWorld />
      <nav>
        <Link href="/about">
          About
        </Link>
        <Button type="link" href="/about">Click me</Button>
      </nav>
      <ul>
        {data.map((p) => (
          <PersonComponent key={p.id} person={p} />
        ))}
      </ul>
    </div>
  )
}
