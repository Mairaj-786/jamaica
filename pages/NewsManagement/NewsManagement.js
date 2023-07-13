import CustomButton from '@/Components/CustomButton/CustomButton'
import CustomTable from '@/Components/CustomTable/CustomTable'
import MyModal from '@/Components/MyModal/MyModal'
import MyToast from '@/Components/MyToast/MyToast'
import { addNewsMethod } from '@/hooks/admin'
import { SingleImageUpload } from '@/hooks/requests'
import { getNews, getUsers } from '@/hooks/user'
import React, { useEffect, useState } from 'react'
import styles from './event-management.module.css'
const NewsManagement = ({ search }) => {

  const [user, setUser] = useState([])
  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const [users, setUsers] = useState([])

  const getUser = async () => {
    let succes = await getNews()
    if (succes) {
      setUsers(succes)
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  const colums = [
    {
      id: 2,
      title: 'Created At'
    },
    {
      id: 1,
      title: 'Title'
    },
    {
      id: 3,
      title: 'Image'
    },
    {
      id: 5,
      title: 'View Details'
    },
    {
      id: 4,
      title: 'Delete'
    },
  ]

  // ======================================== Add news begin =============================
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [body_image, setBody_image] = useState('')
  const [main_image, setMain_image] = useState('')
  const [file1, setFile1] = useState('')
  const [file2, setFile2] = useState('')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const addNews = async () => {
    const data = { user: user._id, body_image, main_image, ...state }
    console.log('as', data)
    let succes = await addNewsMethod(data)
    if (succes) {
      setState({
        title: '',
        description: '',
      })
      getUser()
      setBody_image('')
      setMain_image('')
      setFile2('')
      setFile1('')
      setTimeout(() => {
        setIsModalOpen(false)
      }, 2000);
    }
  }

  const [state, setState] = useState({
    title: '',
    description: '',
  })


  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  // ======================================== Add news end =============================


  return (
    <div>
      <MyToast />
      <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        content={
          <div className={styles.addAdmin}>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='form-group'>
                  <label>Title</label>
                  <input className='form-control' name="title" value={state.title} onChange={handleChange} />
                  {/* {err && state.firstName.length <= 0 && <label className=' w-100 pt-2' styles={{ color: 'red', fontSize: 14 }}>firstName  is required</label>} */}
                </div>
              </div>
              <div className='col-lg-12'>
                <div className='form-group '>
                  <label>Description</label>
                  <textarea name="description" value={state.description} onChange={handleChange} className='form-control' />
                  {/* {err && state.firstName.length <= 0 && <label className=' w-100 pt-2' styles={{ color: 'red', fontSize: 14 }}>firstName  is required</label>} */}
                </div>
              </div>
              <div className='col-lg-6'>
                <label>Change Title Image</label>
                {
                  file1
                    ?
                    <div className={styles.dropFile}>
                      {
                        loading
                          ?
                          <img src={'https://codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif'} />
                          :
                          <img src={URL.createObjectURL(file1)} />
                      }
                    </div>
                    :
                    <div className={styles.dropFile}>
                      <p>Drop A File</p>
                      <p>OR</p>
                      <label htmlFor='drop'>browse</label>
                      <input onChange={async (e) => {
                        setFile1(e.target.files[0])
                        let succes = await SingleImageUpload(e.target.files[0], setLoading)
                        if (succes) {
                          setMain_image(succes)
                        }
                      }} id='drop' type={'file'} />
                    </div>
                }
              </div>
              <div className='col-lg-6'>
                <label>Change Body Image</label>
                {
                  file2
                    ?
                    <div className={styles.dropFile}>
                      {
                        loading2
                          ?
                          <img src={'https://codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif'} />
                          :
                          <img src={URL.createObjectURL(file2)} />
                      }
                    </div>
                    :
                    <div className={styles.dropFile}>
                      <p>Drop A File</p>
                      <p>OR</p>
                      <label htmlFor='drop'>browse</label>
                      <input
                        onChange={async (e) => {
                          setFile2(e.target.files[0])
                          let succes = await SingleImageUpload(e.target.files[0], setLoading2)
                          if (succes) {
                            setBody_image(succes)
                          }
                        }} id='drop' type={'file'} />
                    </div>
                }
              </div>
              <div className='col-lg-12'>
                <div className={'form-group'}>
                  <CustomButton customCLass={styles.addAdminBtn} onClick={addNews} btnStyle={{ background: '#B8136A', color: '#fff', width: 120, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Done" />
                </div>
              </div>
            </div>
          </div>
        } />
      <CustomButton onClick={() => setIsModalOpen(true)} btnStyle={{ background: '#13B8A0', color: '#fff', width: 120, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Add News" />
      <CustomTable colums={colums} setUsers={setUsers} data={users} newsManagement={true} search={search} />
    </div>
  )
}

export default NewsManagement