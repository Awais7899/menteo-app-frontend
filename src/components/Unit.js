import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../constants/Colors';
import SecondaryHeading from './SecondaryHeading';
import DesciptionText from './DescriptionText';
import Progressbar from './ProgressBar';
import EmotionUnit from '../assets/emotion-unit.svg';
import MimicUnit from '../assets/mimic-activity-unit';
import FacialUnit from '../assets/facial-exp-unit.svg';
import BodyUnit from '../assets/body-lang-unit.svg';
import ManipulationUnit from '../assets/manipulation-unit.svg';
import ColdReadingUnit from '../assets/manipulation-unit.svg';
import CustomProgressBar from './CustomProgressBar';

function Unit({
  heading,
  backgroundColor,
  sections,
  tests,
  totalLesson,
  completedLessons,
  index,
}) {
  let progressBarValue;
  if (totalLesson > 0) {
    const totalLessonCompletedPercentage =
      (completedLessons / totalLesson) * 100;
    progressBarValue = totalLessonCompletedPercentage;
  } else {
    progressBarValue = 0;
  }

  const renderImage = () => {
    switch (index) {
      case 0:
        return <EmotionUnit />;
      case 1:
        return <MimicUnit />;
      case 2:
        return <FacialUnit />;
      case 3:
        return <BodyUnit />;
      case 4:
        return <ManipulationUnit />;
      case 5:
        return <ColdReadingUnit />;
    }
  };
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          height: '100%',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingVertical: 16,
            paddingLeft: 16,
            // width: '40%',
          }}>
          <View>
            <View>
              <SecondaryHeading
                text={heading}
                color={Colors.White}
                font={22}
                fontFamily={'Outfit-Medium'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 12,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 16,
                  paddingHorizontal: 8,
                }}>
                <DesciptionText text={`${sections} sections`} />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 16,
                  paddingHorizontal: 8,
                  marginHorizontal: 8,
                }}>
                <DesciptionText text={`${tests} tests`} />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomProgressBar
              height={10}
              containerWidth={130}
              containerRadius={8}
              value={progressBarValue}
              progressContainerColor={`${Colors.White}4D`}
              progressColor={Colors.White}
            />
            <View
              style={{
                marginHorizontal: 12,
              }}>
              <DesciptionText text={`${progressBarValue.toFixed(0)}%`} />
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          {renderImage()}
        </View>
      </View>
    </View>
  );
}

export default Unit;
const styles = StyleSheet.create({
  container: {
    width: '92%',
    borderRadius: 24,
    height: 190,
    marginVertical: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});
