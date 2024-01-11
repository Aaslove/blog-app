import React, { useId } from 'react'

const Select = ()=>React.forwardRef(function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
  return (
    <div className='w-full'>
        {label && 
        <label htmlFor={id} className=''>
            <select id={id} ref={ref} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}>
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
        }
    </div>
  )
})
export default Select