import styled from 'styled-components';
import React from 'react';
import db from '../firebase';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Chat = ({ isDark }) => {
    return (
        <Container>
            <Header isDark={isDark}>
                <Channel isDark={isDark}>
                    <ChannelName>
                        # clever
                    </ChannelName>
                    <ChannelInfo>
                        Company-wide announcements and work-based matters
                    </ChannelInfo>
                </Channel>
                <ChannelDetails isDark={isDark}>
                    <div>
                        Details
                    </div>
                    <Info />
                </ChannelDetails>
            </Header>
            <MessageContainer isDark={isDark}>
                <ChatMessage />
            </MessageContainer>
            <ChatInput isDark={isDark} />
        </Container>
    )
}

export default Chat;

const Container = styled.div `
    display: grid;
    grid-template-rows: 64px auto min-content;
`

const Header = styled.div `
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    border-bottom: ${({ isDark }) => (isDark ? '1px solid rgb(104, 74, 104)' : '1px solid rgba(83, 39, 83, .13)')};
    justify-content: space-between;
`

const MessageContainer = styled.div `
    color: ${({ isDark }) => (isDark ? 'white' : 'black')};
`

const Channel = styled.div `
    color: ${({ isDark }) => (isDark ? 'white' : 'black')};
`

const ChannelDetails = styled.div `
    display: flex;
    align-items: center;
    color: ${({ isDark }) => (isDark ? 'white' : '#606060')};
`

const ChannelName = styled.div `
    font-weight: 700;
`
const ChannelInfo = styled.div `
    font-weight: 400;
    color: #606060;
    font-size: 14px;
    margin-top: 8px;
`

const Info = styled(InfoOutlinedIcon) `
    margin-left: 10px;
    cursor: pointer;
`