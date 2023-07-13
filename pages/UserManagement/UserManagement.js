import CustomTable from '@/Components/CustomTable/CustomTable'
import { getUsers } from '@/hooks/user'
import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import './event-management.module.css'
const UserManagement = ({ search }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUser = async () => {
      let succes = await getUsers()
      if (succes) {
        setUsers(succes)
      }
    }
    getUser()
  }, [])

  // =================== filter by status =======================//
  const [statusType, setStatusType] = useState('')
  const ActiveUser = users?.filter((i) => i.status)
  const InactiveUser = users?.filter((i) => !i.status)


  // =================== filter by status =======================//
  const colums = [
    {
      id: 1,
      title: 'First Name'
    },
    {
      id: 2,
      title: 'Last Name'
    },
    {
      id: 3,
      title: 'Email'
    },
    {
      id: 4,
      title: 'Status'
    },
    {
      id: 'delete',
      title: ''
    },
  ]


  const userData =
    users?.map((i) => (
      { First_Name: i.firstname, Last_Name: i.lastname, Email: i?.email, Status: !i?.status ? '	Inactive' : '	Active' }
    ))


  return (
    <div>
      {
        userData
        &&
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
          <CSVLink title='Jamaica User List' data={userData} style={{ fontSize: 18 }}>Download User List</CSVLink>
          <div>
            <Select
              labelInValue
              defaultValue={{
                label: 'Filter by Status',
              }}
              style={{
                width: '100%',
              }}
              onChange={(e) => setStatusType(e.key)}
              options={[

                {
                  value: 'All Users',
                  label: 'All Users',
                },
                {
                  value: 'Active',
                  label: 'Active',
                },
                {
                  value: 'Inactive',
                  label: 'Inactive',
                },

              ]}
            />
          </div>
        </div>
      }
      <CustomTable colums={colums} setUsers={setUsers} data={statusType == 'Inactive' ? InactiveUser : statusType == 'Active' ? ActiveUser : users} userManagement={true} search={search} />
    </div>
  )
}

export default UserManagement