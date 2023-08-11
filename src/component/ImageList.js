import styled from "styled-components";
import {useRef, useState} from "react";
const ImageListContainer = styled.div`
    margin: 0 auto;
    max-width: 1024px;
`
const ImageListTop = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-block: 30px;
`
const BackOption = styled.span`
    align-items: center;
    aspect-ratio: 1;
    background-color: #fcfcfc;
    border-radius: 50%;
    box-shadow: 0 3px 8px rgba(0,0,0,.24);
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-right: 30px;
    width: 50px;
`
const BackImage = styled.img`
    width: 45px;
`
const Heading = styled.span`
    font-size: 1.7rem;
    font-weight: 700;
`
const AddButton = styled.button`
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
const ImageFormContainer = styled.div`
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
const ImageForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const InputText = styled.input`
    border: 3px solid transparent;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: 300;
    outline: none;
    padding: 10px 10px 10px 15px;
    transition: .3s;
`
const FormBottom = styled.div`
    align-items: center;
    display: flex;
    gap: 30px;
    justify-content: center;
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
const Images = styled.div`
    grid-gap: 20px;
    display: grid;
    gap: 20px;
    grid-auto-flow: row;
    grid-auto-rows: 150px;
    grid-template: repeat(1,150px) /repeat(auto-fit,minmax(175px,.5fr));
    margin-bottom: 50px;
`
const ImageElemet = styled.div`
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px 0 rgba(99,99,99,.2);
    box-sizing: border-box;
    cursor: pointer;
    height: 100%;
    padding: 10px;
    position: relative;
    width: 100%;
`
const Image = styled.img`
    height: 80%;
    object-fit: cover;
    width: 100%;
`
const ImageName =styled.span`

`

function ImageList({updateAlbum, visibleAlbum, closeAlbum}){
    const [isFormVisible, setFormVisible] = useState(false);

    const imageNameInput = useRef();
    const imageUrlInput = useRef();

    function showHideForm(){
        setFormVisible(!isFormVisible);
    }

    // function onSubmitHandler(e){
    //     e.preventDefault();
    //     const ImageName = imageNameInput.current.value;
    //     const ImageUrl = imageUrlInput.current.value;
    //     const image = {
    //         name: ImageName,
    //         url: ImageUrl
    //     };
    //     let newimageList;
    //     const imageList = visibleAlbum.imageList;
    //     if(imageList!=null){
    //         newimageList = [image, ...imageList];
    //     }else{
    //         newimageList = [image];
    //     }
        
    //     const newAlbum = {...visibleAlbum, imageList: newimageList}
    //     updateAlbum(newAlbum);
    //     clearInput();
    //     setFormVisible(false);
    //     return;
    // }

    function onSubmitHandler(e) {
        e.preventDefault();
        const ImageName = imageNameInput.current.value;
        const ImageUrl = imageUrlInput.current.value;
        const image = {
          name: ImageName,
          url: ImageUrl
        };
      
        // const newAlbum = {
        //   ...visibleAlbum,
        //   imageList: [...visibleAlbum.imageList, image] // Concatenate the new image with existing imageList
        // };
      
        updateAlbum(image, visibleAlbum.id);
        clearInput();
        setFormVisible(false);
      }
      

    const clearInput = () => {
        imageNameInput.current.value = "";
        imageUrlInput.current.value = "";
    };
    
    return(
        <ImageListContainer>
            <ImageListTop>
                <BackOption onClick={closeAlbum}>
                    <BackImage src="https://cdn-icons-png.flaticon.com/128/7915/7915208.png"></BackImage>
                </BackOption>
                <Heading>No images found in the {visibleAlbum.name}</Heading>
                {isFormVisible? <CancelButton onClick={showHideForm}>Cancel</CancelButton>:
                                <AddButton onClick={showHideForm}>Add image</AddButton>}
                
            </ImageListTop>
            {
                isFormVisible? 
                <ImageFormContainer>
                    <Heading>Add image to album</Heading>
                    <ImageForm onSubmit={onSubmitHandler}>
                        <InputText ref={imageNameInput} 
                            required placeholder="Title" />
                        <InputText ref={imageUrlInput}
                            required placeholder="Image URL"/>
                        <FormBottom>
                            <ClearButton onClick={clearInput} type="button">Clear</ClearButton>
                            <CreateButton>Add</CreateButton>
                        </FormBottom>
                    </ImageForm>
                </ImageFormContainer>:null
            }

            <Images>
                {
                    visibleAlbum.imageList.map((image, id)=>
                     <ImageElemet key={id} id={id}>
                         <Image src={image.url} alt='image'/>
                         <ImageName>{image.name}</ImageName>
                     </ImageElemet>
                 )
                }
            </Images>
            
        </ImageListContainer>
    )
}

export default ImageList;

// https://cdn-icons-png.flaticon.com/128/7915/7915208.png
