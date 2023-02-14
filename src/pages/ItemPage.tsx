    import React, { useState, useEffect } from "react";
    import styled from "styled-components";


    interface Post {
    id: number;
    title: string;
    body: string;
    timestamp: number;
    }
    
    const ItemPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [sortBy, setSortBy] = useState<"popularity" | "latest">("latest");

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch("");
        const data = await response.json();
        setPosts(data);
        };

        fetchPosts();
    }, []);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as "popularity" | "latest");
    };

    let sortedPosts = posts;
    if (sortBy === "popularity") {
        sortedPosts = sortedPosts.sort((a, b) => b.id - a.id);
    } else if (sortBy === "latest") {
        sortedPosts = sortedPosts.sort((a, b) => b.timestamp - a.timestamp);
    }

    return (
        <Container>
        <Header>
            <input type="text" placeholder='검색' />
            <SortSelect value={sortBy} onChange={handleSortChange}>
            <option value="latest">최신순</option>
            <option value="popularity">인기순</option>
            </SortSelect>
        </Header>
        <PostList>
        
            {sortedPosts.map((post) => (
            <PostCard key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </PostCard>
            ))}
        </PostList>
        </Container>
    );
    };

    const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 20px auto;
    `;

    const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    `;

    const SortSelect = styled.select`
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    `;

    const PostList = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    `;

    const PostCard = styled.li`
    list-style: none;
    margin: 20px;
    width: 300px;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0px 0px 10
    `
export default ItemPage;
    