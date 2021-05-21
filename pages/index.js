import { dbConnect, jsonify } from 'server/middleware/db'
import Headphone from 'server/models/products/headphone'

export async function getServerSideProps(context) {
  dbConnect()
  const headphones = await Headphone.find({}).exec();

  return {
    props: {
      headphones: jsonify(headphones)
    }
  }
}

export default function Home({headphones}) {
  return (
    <div className="container">
        <div className="aaa">
          <p>List</p>
          <ul>
            {headphones.map((headphone) => {
              return <li key={headphone._id}>{headphone.brand}</li>
            })}
          </ul>
        </div>
    </div>
  )
}
