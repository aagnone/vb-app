import React from 'react'
import { LeagueInfoContext } from '../../state/LeagueInfoContext'
import AnimatedHeader from '../AnimatedHeader'
import { ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'
import { themeColor } from '../../styles'
import Border from '../Border'
import ArticleList from '../ArticleList'

const Home = (props) => {
  // const info = useContext(LeagueInfoContext)

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.color2 }} forceInset={{ top: 'always' }}>
        <AnimatedHeader route={props.route} navigation={props.navigation} />
        <Border>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ArticleList />
          </ScrollView>
        </Border>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Home
