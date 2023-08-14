import useSWR from 'swr'
import Link from 'next/link';
import Image from 'next/image'
import type { Person } from '../interfaces'
import styles from './styles.module.scss';
import { Button } from 'antd';
import Footer from '../components/footer'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
function HomePage() {

  const style = {
    marginRight: 10,
    color: 'red',
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('apiUrl:', apiUrl);
  // const { data, error } = useSWR<Person[]>(`${apiUrl}/api/data`, fetcher)
  const { data, error } = useSWR<Person[]>('https://api.github.com/repos/vercel/next.js', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return null

  console.log('data:', data);
  return (
    <>
      <div className={styles.container}>
        <h1 style={{ color: '#3e3e3e' }} >Welcome to our website!</h1>
        <h3 style={style} >Welcome to our website!</h3>
        <Image
          src="/images/vercel.svg"
          alt="Picture of the author"
          width={100}
          height={100}
          priority
        />
        <nav>
          <Link href="/example">
            About
          </Link>
          <Button type="link" href="/example">Click me</Button>
        </nav>
      </div>
      <Footer />
    </>
  )
}
export default HomePage