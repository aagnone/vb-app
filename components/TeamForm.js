import React, { useState, useEffect } from 'react'
import { Input, Center, HStack, VStack, Button, Text, Heading, Modal, Pressable, FlatList, Box } from 'native-base'
import tailwind from 'tailwind-rn'
import { LogBox } from 'react-native'
import db from '../firebase'
import uuid from 'react-native-uuid'
import Icon from 'react-native-vector-icons/FontAwesome'

const TeamForm = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.',
    ])
  }, [])

  const [teamName, setTeamName] = useState()
  const [player, setPlayer] = useState()
  const [roster, setRoster] = useState([])
  const [game, setGame] = useState()
  const [schedule, setSchedule] = useState([])
  const [wins, setWins] = useState()
  const [losses, setLosses] = useState()
  const [showModal, setShowModal] = useState(false)
  const [playerError, setPlayerError] = useState('')

  const handleRemoveRoster = (name) => {
    setRoster((prevRoster) =>
      prevRoster.filter((person) => {
        return person !== name
      })
    )
  }
  const handleRemoveSchedule = (game) => {
    setSchedule((prevSchedule) =>
      prevSchedule.filter((entry) => {
        return entry !== game
      })
    )
  }

  const handleSubmitTeam = () => {
    const docData = {
      teamName,
      roster,
      schedule,
      wins: parseInt(wins),
      losses: parseInt(losses),
    }
    db.collection('teams')
      .doc(teamName)
      .set(docData)
      .then(() => {
        setTeamName('')
        setRoster([])
        setSchedule([])
        setGame('')
        setPlayer('')
        console.log('successful')
      })
  }
  return (
    <>
      <VStack style={tailwind('justify-between mb-4 mt-4')} width="90%" mx={3}>
        <Heading>Create new Team</Heading>
        <Input
          height={'40px'}
          style={tailwind('mb-2')}
          placeholder="TeamName"
          onChangeText={(value) => setTeamName(value)}
        />
        <HStack style={tailwind('justify-between')}>
          <Input
            height={'40px'}
            style={tailwind('w-1/2')}
            placeholder="Player"
            onChangeText={(value) => setPlayer(value)}
            value={player}
          />
          <Button
            style={tailwind('w-1/3 p-0')}
            colorScheme="cyan"
            onPress={() => {
              if (roster.indexOf(player) !== -1) {
                setPlayerError('Player already exists')
              } else {
                setRoster([...roster, player])
                setPlayerError('')
              }
              setPlayer('')
            }}
          >
            Add Player
          </Button>
        </HStack>
        <Text style={tailwind('text-red-500 text-xs')}>{playerError}</Text>
        <HStack style={tailwind('justify-between')}>
          <Input
            height={'40px'}
            placeholder="Wins"
            onChangeText={(value) => setWins(value)}
            style={tailwind('w-5/12')}
            value={wins}
          />

          <Input
            height={'40px'}
            placeholder="Losses"
            onChangeText={(value) => setLosses(value)}
            style={tailwind('w-5/12')}
            value={losses}
          />
        </HStack>
        <Center>
          <Text style={tailwind('text-gray-500 text-xs mb-2')}>Just type in record and it will reflect in preview</Text>
        </Center>
        <HStack style={tailwind('justify-between mb-2')}>
          <Input
            height={'40px'}
            style={tailwind('w-1/2')}
            placeholder="Game"
            onChangeText={(value) => setGame(value)}
            clearButtonMode="always"
            value={game}
          />
          <Button
            style={tailwind('w-1/3 p-0')}
            colorScheme="cyan"
            onPress={() => {
              setSchedule([...schedule, game])
            }}
          >
            Add Game
          </Button>
        </HStack>
        <HStack style={tailwind('justify-between flex w-full')} height={'50px'}>
          <Button style={tailwind('w-1/3 p-0')} height={12} colorScheme="cyan" onPress={() => setShowModal(true)}>
            <Text fontSize={'sm'} fontWeight="bold" color="white">
              Preview Team
            </Text>
          </Button>
          <Button style={tailwind('w-1/2 p-0')} height={12} colorScheme="cyan" onPress={() => handleSubmitTeam()}>
            Submit Team
          </Button>
        </HStack>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header style={tailwind('flex')}>
            <Text style={tailwind('text-lg font-bold mt-1')}>Team Preview</Text>
            <Modal.CloseButton style={tailwind('-mt-8')} />
          </Modal.Header>
          <Modal.Body>
            <Text>Team Name: {teamName}</Text>
            <Text>Roster: </Text>
            <FlatList
              style={tailwind('mt-2')}
              data={roster}
              renderItem={({ item }, i) => {
                return (
                  <Box style={tailwind('flex flex-row')}>
                    <Text style={tailwind('ml-2')}>{item}</Text>
                    <Pressable
                      onPress={() => {
                        handleRemoveRoster(item)
                      }}
                      style={tailwind('ml-2')}
                    >
                      <Icon name="times" size={16} color="red" />
                    </Pressable>
                  </Box>
                )
              }}
              keyExtractor={(item) => item}
            />
            <Text>Schedule: </Text>
            <FlatList
              style={tailwind('mt-2')}
              data={schedule}
              renderItem={({ item }, i) => {
                return (
                  <Box style={tailwind('flex flex-row')}>
                    <Text style={tailwind('ml-2')}>{item}</Text>
                    <Pressable
                      onPress={() => {
                        handleRemoveSchedule(item)
                      }}
                      style={tailwind('ml-2')}
                    >
                      <Icon name="times" size={16} color="red" />
                    </Pressable>
                  </Box>
                )
              }}
              keyExtractor={(item) => uuid.v4()}
            />
            <Text>
              Record: Wins: {wins} - Losses: {losses}
            </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default TeamForm
