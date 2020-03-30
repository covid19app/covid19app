import { Container, Text, View } from 'native-base';
import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';

import ActionButton from '../components/ActionButton';
import { BigImage } from '../components/BigImageButton';
import Prevention from '../components/Prevention';
import WebBrowser from '../components/WebBrowser';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { t, tkeys } from '../utils/i18n';
import { Action, NextSteps } from '../utils/schema';

export default function NextStepsScreen({ route }) {
  const nextSteps = route.params?.nextSteps as NextSteps

  return (
    <Container>
      <Grid>
        { (!!nextSteps?.action || !!nextSteps?.text) &&
          <Row style={styles.row}>
            { nextSteps?.action === Action.STAY_HEALTHY &&
              <BigImage source={require('../assets/virus_defence.png')} />
            }
            { [Action.GET_TESTED, Action.CALL_DOCTOR, Action.GO_TO_HOSPITAL].includes(nextSteps?.action) &&
              <BigImage source={require('../assets/action/visit_doctor.png')} />
            }
            { nextSteps?.action === Action.SELF_QUARANTINE &&
              <BigImage source={require('../assets/action/self_quarantine.png')} />
            }
            { !!nextSteps?.text && <Text style={[styles.text, {width: '50%'}]}>{nextSteps.text}</Text> }
          </Row>
        }
        { !!nextSteps?.externalLink &&
          <Row size={0.5} style={styles.row}>
            <View style={StyleSheet.absoluteFill}>
              <ActionButton info onPress={() => Linking.openURL(nextSteps.externalLink)}
                  title={nextSteps.externalLinkTitle || t(tkeys.generic_OpenExternalLink)} />
            </View>
          </Row>
        }
        <Row size={3} style={styles.row}>
          { !!nextSteps?.html &&
            <WebBrowser originWhitelist={['*']} source={{ html: nextSteps.html }} />
          }
          { !nextSteps?.html && (!nextSteps || nextSteps?.action === Action.STAY_HEALTHY) &&
            <Prevention />
          }
        </Row>
      </Grid>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    alignItems: 'center',
  },
  text: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
})
