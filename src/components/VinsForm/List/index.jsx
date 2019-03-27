import React from 'react';
import Checkbox from '../../Checkbox';

import '../index.scss';

export default (p) => (
		<Checkbox checked={p.checked} value={p.checked} onChange={() => p.onCheck(p.text)}>
			{p.text}
		</Checkbox>
)