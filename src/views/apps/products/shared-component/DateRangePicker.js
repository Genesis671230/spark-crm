// ** React Imports
import {useState, forwardRef} from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const PickersRange = ({label, value, guaranteePeriod, warrantyPeriod, setWarrantyPeriod, setGuaranteePeriod}) => {
  // ** States
  let [endDate, setEndDate] = useState(null)

  let [startDate, setStartDate] = useState(null)

  const [endDateRange, setEndDateRange] = useState(null)

  const [startDateRange, setStartDateRange] = useState(null)

  const handleOnChangeRange = dates => {
    const [start, end] = dates

    setStartDateRange(start)
    setEndDateRange(end)
  }

  const CustomInput = forwardRef((props, ref) => {
    const {start, end} = props
    startDate = start ? format(start, 'MM/dd/yyyy') : ''
    endDate = end !== null ? format(end, 'MM/dd/yyyy') : null
    const value = `${startDate} ${endDate !== null ? ` to  ${endDate}` : ''}`
    label === 'Warranty Period' ? setWarrantyPeriod(value) : setGuaranteePeriod(value)

    return <TextField inputRef={ref} label={props.label || ''} {...props}
                      value={label === 'Warranty Period' ? warrantyPeriod : guaranteePeriod} sx={{width: '100%'}}/>
  })

  return (
    <DatePickerWrapper>
      <DatePicker
        selectsRange
        monthsShown={2}
        endDate={endDateRange}
        selected={startDateRange}
        startDate={startDateRange}
        shouldCloseOnSelect={false}
        id='date-range-picker-months'
        onChange={handleOnChangeRange}
        customInput={<CustomInput label={label} end={endDateRange} start={startDateRange}/>}
      />
    </DatePickerWrapper>
  )
}

export default PickersRange
