import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';

import { t, tkeys } from '../utils/i18n';
import BigImageButton from './BigImageButton';

interface PreventionProps {
}

export default function Prevention(props: PreventionProps) {
  return (
    <Grid>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <BigImageButton
              imageSource={require('../assets/prevention/social_distancing.png')}
              title={t(tkeys.prevention_SocialDistancing)} />
        </Col>
        <Col style={styles.col}>
          <BigImageButton
              imageSource={require('../assets/prevention/limit_travel.png')}
              title={t(tkeys.prevention_LimitTravel)} />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <BigImageButton
              imageSource={require('../assets/prevention/wash_your_hands.png')}
              title={t(tkeys.prevention_WashYourHands)} />
        </Col>
        <Col style={styles.col}>
          <BigImageButton
              imageSource={require('../assets/prevention/wear_face_mask.png')}
              title={t(tkeys.prevention_WearFaceMask)} />
        </Col>
      </Row>
      <Row size={2} style={styles.row} />
    </Grid>
  )
}

const styles = StyleSheet.create({
  col: {
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
  },
})
