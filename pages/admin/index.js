import Head from 'next/head'
import AdminMenu from '../../components/admin/AdminMenu'

export default function Admin() {
  return (
      <div>
        <h1>This is admin</h1>
      </div>
  )
}


Admin.getLayout = function getLayout(page) {
  return (
      <AdminMenu>{page}</AdminMenu>
  )
}
