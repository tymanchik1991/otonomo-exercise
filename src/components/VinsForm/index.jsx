import React from 'react'
import Input from '../Input'
import Button from '../Button'
import List from './List';
import './index.scss';

export default ({ text, list, errorText, handleOnChange, handleOnSubmit, handleOnCheck }) => (
	<div className='form-wrapper'>
		<div className='form-header'>
			<Input onChange={handleOnChange} value={text} />
			<Button onClick={handleOnSubmit} value={'+ ADD'} />
		</div>
		<span className='form-error'>{errorText}</span>
		<div className='form-list'>
			{list.map(data => (
				<List
					key={data.vin}
					text={data.vin}
					checked={data.checked}
					onCheck={handleOnCheck} />
			))}
		</div>
	</div>
)
