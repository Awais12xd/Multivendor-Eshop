import { useNavigate } from 'react-router-dom'

const DropDown = ({categoriesData , setDropDown}) => {
    const navigate = useNavigate();
    const handleSubmit = (data) => {
        navigate(`/products?category=${data.title}`)
        setDropDown(false)
        window.location.reload()
    }
  return (
    <div className='pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm' >
      {
        categoriesData && categoriesData.map((data,index) => (
            <div className="flex items-center" key={index} onClick={() => handleSubmit(data)}>
                <img src={data.image_Url} alt="Category" className='h-[25px] w-[25px] object-contain ml-3 select-none' />
                <h1 className='m-3 cursor-pointer select-none text-black'>{data.title}</h1>
            </div>
        ))
      }
    </div>
  )
}

export default DropDown
