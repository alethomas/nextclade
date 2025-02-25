import React, { useCallback } from 'react'

import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  ButtonProps,
  Button,
  Col,
  Modal as ReactstrapModal,
  ModalBody as ReactstrapModalBody,
  ModalFooter as ReactstrapModalFooter,
  ModalHeader as ReactstrapModalHeader,
  Row,
} from 'reactstrap'
import { FaFile } from 'react-icons/fa'

import type { State } from 'src/state/reducer'
import type { PanelButtonProps } from 'src/components/Results/PanelButton'
import { PanelButton } from 'src/components/Results/PanelButton'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { setShowNewRunPopup } from 'src/state/ui/ui.actions'
import { algorithmRunAsync } from 'src/state/algorithm/algorithm.actions'
import { selectCanRun } from 'src/state/algorithm/algorithm.selectors'

export const ButtonClose = styled(Button)<ButtonProps>`
  width: 100px;
`

export const ModalHeader = styled(ReactstrapModalHeader)`
  .modal-title {
    width: 100%;
  }
`

export const Modal = styled(ReactstrapModal)`
  @media (max-width: 1200px) {
    min-width: 80vw;
  }
  @media (min-width: 1201px) {
    min-width: 957px;
  }
`

export const ModalBody = styled(ReactstrapModalBody)`
  display: flex;
  height: 66vh;
  flex-direction: column;
`

export const Scrollable = styled.div`
  flex: 1;
  overflow-y: auto;

  // prettier-ignore
  background:
    linear-gradient(#ffffff 33%, rgba(255,255,255, 0)),
    linear-gradient(rgba(255,255,255, 0), #ffffff 66%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(119,119,119, 0.5), rgba(0,0,0,0)),
    radial-gradient(farthest-side at 50% 100%, rgba(119,119,119, 0.5), rgba(0,0,0,0)) 0 100%;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-attachment: local, local, scroll, scroll;
  background-size: 100% 24px, 100% 24px, 100% 8px, 100% 8px;
`

export const ModalFooter = styled(ReactstrapModalFooter)``

export interface ButtonNewRunProps extends PanelButtonProps {
  canRun: boolean
  showNewRunPopup: boolean

  algorithmRunTrigger(_0: unknown): void

  setShowNewRunPopup(showNewRunPopup: boolean): void
}

const mapStateToProps = (state: State) => ({
  canRun: selectCanRun(state),
  showNewRunPopup: state.ui.showNewRunPopup,
})

const mapDispatchToProps = {
  algorithmRunTrigger: algorithmRunAsync.trigger,
  setShowNewRunPopup,
}

export const ButtonNewRun = connect(mapStateToProps, mapDispatchToProps)(ButtonNewRunDisconnected)

export function ButtonNewRunDisconnected({
  canRun,
  showNewRunPopup,
  algorithmRunTrigger,
  setShowNewRunPopup,
}: ButtonNewRunProps) {
  const { t } = useTranslationSafe()

  const open = useCallback(() => setShowNewRunPopup(true), [setShowNewRunPopup])
  const close = useCallback(() => setShowNewRunPopup(false), [setShowNewRunPopup])
  const toggleOpen = useCallback(() => setShowNewRunPopup(!showNewRunPopup), [setShowNewRunPopup, showNewRunPopup])

  // const run = useCallback(() => {
  //   setShowNewRunPopup(false)
  //   algorithmRunTrigger(undefined)
  // }, [algorithmRunTrigger, setShowNewRunPopup])

  return (
    <>
      <PanelButton
        onClick={open}
        title={t('New run: opens a dialog where you can start a new analysis')}
        disabled={!canRun}
      >
        <FaFile className="mr-xl-2 mb-1" />
      </PanelButton>

      <Modal centered isOpen={showNewRunPopup} toggle={toggleOpen} fade={false} size="lg">
        <ModalHeader toggle={close} tag="div">
          <h3 className="text-center">{t('New run')}</h3>
        </ModalHeader>

        <ModalBody>
          <Scrollable>{/* <FilePickerAdvanced /> */}</Scrollable>
        </ModalBody>

        <ModalFooter>
          <Row noGutters>
            <Col>{/* <ButtonsAdvanced canRun={canRun} run={run} /> */}</Col>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  )
}
