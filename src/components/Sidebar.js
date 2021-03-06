import React from 'react'
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { sidebarItemsData } from '../data/SidebarData';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import db from '../firebase';

const Sidebar = (props) => {
    const history = useHistory();

    const goToChannel = (id) => {
        if(id) {
            history.push(`/room/${id}`)
        }
    }

    const addChanneel = () => {
        const promptName = prompt("Enter channel name");
        if(promptName) {
            db.collection('rooms').add({
                name: promptName,
            });
        }
    }

    return (
        <div>
            <Container isDark={props.isDark}>
                <WorkspaceContainer>
                    <Name>
                        CleverProgrammer
                    </Name>
                    <NewMessage isDark={props.isDark}>
                        <AddCircleOutlineIcon />
                    </NewMessage>
                </WorkspaceContainer>
                <MainChannels>
                    {
                        sidebarItemsData.map(item => (
                            <MainChannelItem>
                                {item.icon}
                                {item.text}
                            </MainChannelItem>
                        ))
                    }
                </MainChannels>

                <ChannelsContainer>
                    <NewChannelContainer>
                        <div>
                            Channels
                        </div>
                        <AddIcon onClick={addChanneel} />
                    </NewChannelContainer>
                    <ChannelsList>
                        {
                            props.rooms.map(room => (
                                <Channel onClick={() => goToChannel(room.id)} >
                                    # {room.name}
                                </Channel>
                            ))
                        }
                    </ChannelsList>
                </ChannelsContainer>
            </Container>
        </div>
    )
}

export default Sidebar;

const Container = styled.div `
    background: ${({ isDark }) => (isDark ? 'rgb(40, 40, 40)' : '#350d36')};
    height: 100%;
`

const WorkspaceContainer = styled.div `
    color: white;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    justify-content: space-between;
    border-bottom: 1px solid #532753;
`

const Name = styled.div `

`

const NewMessage = styled.div `
    width: 36px;
    height: 36px;
    background: ${({ isDark }) => (isDark ? 'rgb(80, 80, 80)' : 'white')};
    color: ${({ isDark }) => (isDark ? 'gray' : '#3F0E40')};
    fill: ${({ isDark }) => (isDark ? 'gray' : '#3F0E40')};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
`
const MainChannels = styled.div `
    padding-top: 20px;
`

const MainChannelItem = styled.div `
    color: rgb(188, 171, 188);
    display: grid;
    grid-template-columns: 15% auto;
    height: 28px;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    :hover {
        background: #350D36;
    }
`
const ChannelsContainer = styled.div `
   color: rgb(188, 171, 188);
   margin-top: 10px;
`
const NewChannelContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding-left: 19px;
    padding-right: 12px;

    AddIcon {
        cursor: pointer;
    }
`

const ChannelsList = styled.div `

`
const Channel = styled.div `
    height: 28px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    :hover {
        background: #350D36;
    }
`