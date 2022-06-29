import React, { Fragment } from 'react'
import { Button } from '../Button/Button'
import { Dialog, Transition } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import * as styles from './Modal.module.css'

export function Modal (props) {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as='div' className={styles.modalContainer} onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter={styles.enterBack}
          enterFrom={styles.enterFromBack}
          enterTo={styles.enterToBack}
          leave={styles.leaveBack}
          leaveFrom={styles.leaveFromBack}
          leaveTo={styles.leaveToBack}
        >
          <div className={styles.back} />
        </Transition.Child>

        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Transition.Child
              as={Fragment}
              enter={styles.panelEnter}
              enterFrom={styles.panelEnterFrom}
              enterTo={styles.panelEnterTo}
              leave={styles.panelLeave}
              leaveFrom={styles.panelLeaveFrom}
              leaveTo={styles.panelLeaveTo}
            >
              <Dialog.Panel className={styles.panel}>
                <div style={{ textAlign: 'right' }}>
                  <Button
                    onClick={props.onClose}
                    title={<FaTimes size={24} />}
                    styleType='text'
                  />
                </div>
                {
                  props.title && (
                    <Dialog.Title as='h2' style={{ marginTop: '0', textAlign: 'center' }}>
                      {props.title}
                    </Dialog.Title>
                  )
                }
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
