import Link from "next/link";
export default function Home() {
  return (
      <>
          <div className='invisible lg:visible'>66</div>
      </>
  );
}

export async function getStaticProps() {
    return {
        props: {}
    }
}
