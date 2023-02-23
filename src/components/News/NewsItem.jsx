    import React from "react";
    import styled from 'styled-components';
    
    const NewsItem = props => {
    return (
    <ItemContainer>
        <ItemData>
        <Title>{props.title}</Title>
        <ItemContents>{props.contents}</ItemContents>
        <ItemUrl href={props.url}>링크 바로가기</ItemUrl>
        <ItemDatetime>{props.datetime}</ItemDatetime>
        </ItemData>
    </ItemContainer>
    );
    };

    export default NewsItem;

    const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    border: 1px solid #dddddd;
    padding: 3rem;
    `;

    const ItemData = styled.div`
    display: flex;
    flex-direction: column;
    `;

    const Title = styled.div`
    font-size: 1rem;
    `;

    const ItemContents = styled.div`
    font-size: 0.8rem;
    `;

    const ItemUrl = styled.a`
    font-size: 0.8rem;
    margin-top: 0.5rem;
    `;

    const ItemDatetime = styled.div`
    font-size: 0.8rem;
    margin-top: 0.5rem;
    `;