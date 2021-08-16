import React, { useState, useRef } from 'react'
import { Input, HStack, Text, Heading, Modal, Button, TextArea } from 'native-base'
import { StyleSheet, ScrollView, View } from 'react-native'
import tailwind from 'tailwind-rn'
import db from '../firebase'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'
import { actions, defaultActions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import HTMLView from 'react-native-htmlview'

const AnnouncementsForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [showModal, setShowModal] = useState(false)
  const RichText = useRef() //reference to the RichEditor component

  const handleSubmitTeam = () => {
    const docData = {
      title,
      content,
    }
    db.collection('blog')
      .add(docData)
      .then(() => {
        setTitle('')
        setContent('')
        console.log('successful')
      })
  }

  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log('Toolbar click, selected items (insert end callback):', items)
    })
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} forceInset={{ top: 'always' }}>
          <ScrollView contentContainerStyle={tailwind('flex justify-center')}>
            <View style={tailwind('justify-between pb-4 ml-4')} width="90%" mx={3}>
              <Heading>Create new Message</Heading>
              <Input
                style={tailwind('w-full mt-2 mb-2')}
                _focus={{ width: '300px' }}
                height={'40px'}
                placeholder="Title"
                value={title}
                onChangeText={(value) => setTitle(value)}
              />
              <RichEditor
                disabled={false}
                containerStyle={styles.editor}
                ref={RichText}
                style={{height: 200}}
                placeholder={'Start Writing Here'}
                onChange={(text) => setContent(text)}
                editorInitializedCallback={editorInitializedCallback}
                onHeightChange={handleHeightChange}
                value={content}
              />
              <HStack style={tailwind('justify-between mb-2')}>
                <Button style={tailwind('p-1 w-5/12 text-center py-3')} onPress={() => setShowModal(true)}>
                  <Text fontSize={'sm'} fontWeight="bold" color="white">
                    Preview Message
                  </Text>
                </Button>
                <Button style={tailwind('p-1 w-1/2')} onPress={() => handleSubmitTeam()}>
                  <Text fontSize={'sm'} fontWeight="bold" color="white">
                    Submit Message
                  </Text>
                </Button>
              </HStack>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header style={tailwind('flex')}>
            <Text style={tailwind('text-lg font-bold mt-1')}>Message Preview</Text>
            <Modal.CloseButton style={tailwind('-mt-8')} />
          </Modal.Header>
          <Modal.Body>
            <Heading>{title}</Heading>
            <HTMLView value={content} stylesheet={styles} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
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
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 30,
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
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
})

export default AnnouncementsForm
