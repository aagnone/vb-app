import React, { useState, useRef, useContext } from 'react'
import { AnnouncementsContext } from '../state/AnnouncementsContext'
import { Heading } from 'native-base'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated'
import { themeColor } from '../styles'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'
import tailwind from 'tailwind-rn'
import HTMLView from 'react-native-htmlview'
const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

const colors = [
  { bg: '#3B8686', color: '#CFF09E' },
  { bg: '#0B486B', color: '#CFF09E' },
  { bg: '#A8DBA8', color: '#0B486B' },
  { bg: '#79BD9A', color: '#0B486B' },
  { bg: '#CFF09E', color: '#0B486B' },
  { bg: '#0B486B', color: '#CFF09E' },
  { bg: '#CFF09E', color: '#0B486B' },
  { bg: '#A8DBA8', color: '#0B486B' },
  { bg: '#79BD9A', color: '#0B486B' },
  { bg: '#3B8686', color: '#CFF09E' },
]

const ArticleList = () => {
  const announcements = useContext(AnnouncementsContext)
  const [currentIndex, setCurrentIndex] = useState(null)
  const ref = useRef()
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: themeColor.color2 }}
        forceInset={{ top: 'always' }}
      ></SafeAreaView>
      <Transitioning.View ref={ref} transition={transition} style={tailwind('flex flex-col items-center flex-1 p-8')}>
        {announcements &&
          announcements.map(({ title, content }, index) => {
            return (
              <TouchableOpacity
                key={title}
                onPress={() => {
                  ref.current.animateNextTransition()
                  setCurrentIndex(index === currentIndex ? null : index)
                }}
                style={[
                  { backgroundColor: themeColor.color1 },
                  tailwind('justify-center w-full mb-3 rounded-lg overflow-hidden flex-1'),
                ]}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    tailwind('flex flex-grow justify-center overflow-hidden'),
                    { backgroundColor: themeColor.color },
                  ]}
                >
                  <View
                    style={[
                      { backgroundColor: themeColor.color5 },
                      tailwind('w-full rounded-b-lg flex-1 p-2 py-4 flex-grow overflow-hidden'),
                    ]}
                  >
                    <Heading style={{ color: 'white' }}>{title}</Heading>
                  </View>

                  {index === currentIndex && (
                    <View style={tailwind('mt-2 pb-4')}>
                      <HTMLView value={content} stylesheet={styles} />
                    </View>
                  )}
                </View>
                <View>
                  <Text style={[tailwind('text-center font-bold py-2'), { color: themeColor.color5 }]}>
                    {index === currentIndex ? 'Collapse Article' : 'Read Article'}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
      </Transitioning.View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    padding: 10,
    marginBottom: -28,
    color: themeColor.color5,
  },
  p: {
    fontSize: 30,
    color: themeColor.color5,
  },
  /*******************************/
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#F5FCFF',
  },
  editor: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: themeColor.color5,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
})

export default ArticleList
