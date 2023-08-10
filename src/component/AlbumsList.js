import styled from 'styled-components';
import React, { useEffect, useRef, useState } from "react";

const AlbumForm = styled.div`
    background-color: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(99,99,99,.2);
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 50px auto 30px;
    padding: 20px;
    width: 50vw;
` 
const Heading = styled.span`
    font-size: 1.7rem;
    font-weight: 700;
`

const FormStyle = styled.form`
    align-items: center;
    display: flex;
    gap: 10px;
    justifyContent: space-evenly;
`

const Input = styled.input`
    border: 3px solid transparent;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: 300;
    outline: none;
    padding: 10px 10px 10px 15px;
    transition: .3s;
    width: 60%;
    &:focus {
        border: 3px solid #3498db;
    }
`

const ClearButton = styled.button`
    background-color: #ff1300;
    border: none;
    border-radius: 7px;
    box-shadow: 0 3px 8px rgba(0,0,0,.24);
    color: #fff;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    outline: none;
    padding-block: 7px;
    width: 100px;
`
const CreateButton = styled.button`
    background-color: #07f;
    border: none;
    border-radius: 7px;
    box-shadow: 0 3px 8px rgba(0,0,0,.24);
    color: #fff;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    outline: none;
    padding-block: 7px;
    width: 100px;
`
const AlbumList = styled.div`
    margin: 0 auto;
    max-width: 1024px;
`
const AlbumListTop = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;    
`
const AddAlbum = styled.button`
    background-color: rgba(0,119,255,.1);
    border: 2px solid #07f;
    border-radius: 5px;
    color: #07f;
    cursor: pointer;
    font-weight: 700;
    outline: none;
    padding: 5px 10px;
`
const CancelButton = styled.button`
    background-color: rgba(255,19,0,.1);
    border: 2px solid #ff1300;
    border-radius: 5px;
    color: #ff1300;
    cursor: pointer;
    font-weight: 700;
    outline: none;
    padding: 5px 10px;
`
const Albums = styled.div`
    grid-gap: 30px;
    display: grid;
    gap: 30px;
    grid-auto-flow: row;
    grid-auto-rows: 150px;
    grid-template: repeat(1,150px) /repeat(auto-fit,minmax(150px,.5fr));
    margin-bottom: 100px;
`
const Album = styled.div`
    align-items: center;
    border: 5px solid #eee;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    margin-block: 30px;
    transition: border-color .3s;
    width: 100%;
`
const Image = styled.img`
    margin-bottom: 30px;
    width: 50px;
`
const AlbumName = styled.span`
    background-color: #eee;
    font-size: 1.1rem;
    font-weight: 700;
    justify-self: baseline;
    padding-block: 5px;
    text-align: center;
    transition: .3s;
    width: 100%;
`
function AlbumsList({addAlbum, albums}){
    const [isFormVisible, setFormVisible] = useState(false);

    const albumNameInput = useRef();

    function showHideForm(){
        setFormVisible(!isFormVisible);
    }
    
    function onSubmitHandler(e){
        e.preventDefault();
        const AlbumName = albumNameInput.current.value;
        const album = {
            name: AlbumName
        };
        addAlbum(album);
        clearInput();
        setFormVisible(false);
        return;
    }

    const clearInput = () => {
        albumNameInput.current.value = "";
    };
    
    return(
    <>
        {isFormVisible?
            <AlbumForm>
                <Heading>Create an Album</Heading>
                <FormStyle onSubmit={onSubmitHandler}>
                    <Input 
                    ref={albumNameInput}
                    type="text" required placeholder="Album Name"/>
                    <ClearButton onClick={clearInput} type="button">Clear</ClearButton>
                    <CreateButton>Create</CreateButton>
                </FormStyle>
            </AlbumForm>: null
        }
        
        <AlbumList>
            <AlbumListTop>
                <Heading>Your albums</Heading>
                {isFormVisible?
                    <CancelButton onClick={showHideForm}>Cancel</CancelButton>:
                    <AddAlbum onClick={showHideForm}>Add album</AddAlbum>

                }
            </AlbumListTop>
            <Albums>
                {
                    albums.map((album)=>
                        <Album key={album.id} id={album.id}>
                            <Image src='https://cdn-icons-png.flaticon.com/128/7224/7224509.png' alt='image'/>
                            <AlbumName>{album.name}</AlbumName>
                        </Album>
                    )
                }
                
            </Albums>
        </AlbumList>
    </>
    )
}

export default AlbumsList;