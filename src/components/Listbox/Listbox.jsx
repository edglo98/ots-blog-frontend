import React, { Fragment, useState } from 'react'
import { Listbox as ListboxHeadlessUI, Transition } from '@headlessui/react'
import { MdOutlineDone, MdOutlineExpandMore } from 'react-icons/md'
import * as styles from './Listbox.module.css'

export function Listbox ({ options, onChange }) {
  const [selected, setSelected] = useState(options[0])

  const handleChange = (value) => {
    setSelected(value)
    if (onChange) onChange(value)
  }

  return (
    <ListboxHeadlessUI value={selected} onChange={handleChange}>
      <div className={styles.listboxConatiner}>
        <ListboxHeadlessUI.Button className={styles.button}>
          <span className={styles.buttonTitle}>{selected.label}</span>
          <span className={styles.icon}>
            <MdOutlineExpandMore size={24} />
          </span>
        </ListboxHeadlessUI.Button>
        <Transition
          as={Fragment}
          leave={styles.listBoxLeave}
          leaveFrom={styles.listBoxLeaveFrom}
          leaveTo={styles.listBoxLeaveTo}
        >
          <ListboxHeadlessUI.Options className={styles.listbox}>
            {options.map((option) => (
              <ListboxHeadlessUI.Option
                key={option.id}
                className={() => styles.option}
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`
                          ${styles.current}
                          ${selected ? styles.selected : styles.noSelected}
                        `}
                    >
                      {option.label}
                    </span>
                    {selected
                      ? (
                        <span className={styles.checkIcon}>
                          <MdOutlineDone size={24} />
                        </span>
                        )
                      : null}
                  </>
                )}
              </ListboxHeadlessUI.Option>
            ))}
          </ListboxHeadlessUI.Options>
        </Transition>
      </div>
    </ListboxHeadlessUI>
  )
}
