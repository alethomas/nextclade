import React from 'react'

import { useTranslation } from 'react-i18next'
import { Col } from 'reactstrap'
import {
  ButtonClear,
  ButtonContainer,
  ButtonDownload,
  ColFlexHorizontal,
  ColFlexVertical,
  Footnote,
  Form,
  Label,
  Row,
  RowFill,
  TextInputMonospace,
} from 'src/components/Main/FilePicker'

export interface TabPanelUrlProps {
  url: ''

  onUrlChange(seqData: string): void
}

export function TabPanelUrl({ url, onUrlChange }: TabPanelUrlProps) {
  const { t } = useTranslation()

  const hasUrl = url.length > 0

  return (
    <Form>
      <RowFill noGutter>
        <ColFlexVertical>
          <Row noGutter>
            <Col className="d-flex">
              <Label className="mr-auto" htmlFor="tree-url-text-input">
                {t('Enter URL to a file to fetch')}
              </Label>
            </Col>
          </Row>

          <RowFill noGutter>
            <ColFlexVertical>
              <TextInputMonospace
                id="tree-url-text-input"
                className="flex-grow-1"
                type="textarea"
                placeholder={t('For example: {{exampleUrl}}', { exampleUrl: 'https://example.com/data.fasta' })}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-gramm="false"
                wrap="off"
                data-gramm_editor="false"
                value={url}
                onChange={onUrlChange}
              />
            </ColFlexVertical>
          </RowFill>

          <Row>
            <ColFlexHorizontal>
              <Footnote>{t('*Make sure this file is publicly accessible and CORS is enabled on your server')}</Footnote>
            </ColFlexHorizontal>
          </Row>

          <Row noGutter>
            <ColFlexHorizontal>
              <ButtonContainer>
                <ButtonClear disabled={!hasUrl} type="button" color="secondary" title={t('Clear the URL text field')}>
                  {t('Clear')}
                </ButtonClear>

                <ButtonDownload
                  disabled={!hasUrl}
                  type="button"
                  color="primary"
                  title={hasUrl ? 'Start downloading this file' : 'Provide a URL before downloading is possible'}
                >
                  {t('Download')}
                </ButtonDownload>
              </ButtonContainer>
            </ColFlexHorizontal>
          </Row>
        </ColFlexVertical>
      </RowFill>
    </Form>
  )
}
