'use client'

import React from 'react'
import { Checkbox, CheckboxGroup, Input } from '@nextui-org/react'
import { Snippet } from '@nextui-org/snippet'

export default function PricingPage() {
  const [selected, setSelected] = React.useState("buenos-aires");

  const handleValueChange = (values: string[]) => {
    // 只保留最后一个选中的值，实现单选效果
    setSelected(values[values.length - 1]);
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        <CheckboxGroup
          label="Select a city"
          color="warning"
          value={[selected]} // 将单个值转为数组形式
          onValueChange={handleValueChange}
        >
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
        </CheckboxGroup>
        <p className="text-default-500 text-small">Selected: {selected}</p>
      </div>
    </>
  )
}
