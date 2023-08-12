import styled from "styled-components";
import {useRef, useState} from "react";
import { doc, updateDoc, deleteField, deleteDoc, arrayUnion } from "firebase/firestore";

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
const Image = styled.img`
    height: 80%;
    object-fit: cover;
    width: 100%;
`
const ImageName =styled.span`

`
const ImageCarousel = styled.div`
    align-items: center;
    background-color: rgba(0,0,0,.5);
    display: flex;
    gap: 30px;
    inset: 0;
    justify-content: center;
    position: fixed;
    z-index: 999;
`
const CloseButton = styled.button`
    align-items: center;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    font-size: 1.6rem;
    font-weight: 800;
    justify-content: center;
    outline: none;
    transition: .3s;
    width: 60px;

    position: absolute;
    right: 50px;
    top: 50px;
`
const PreviousImage = styled.button`
    align-items: center;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    font-size: 1.6rem;
    font-weight: 800;
    justify-content: center;
    outline: none;
    transition: .3s;
    width: 60px;
`
const NextImage = styled.button`
    align-items: center;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    font-size: 1.6rem;
    font-weight: 800;
    justify-content: center;
    outline: none;
    transition: .3s;
    width: 60px;
`
const CarouselLargeImage = styled.img`
    height: 80%;
    object-fit: cover;
    width: 60vw;
`

const UpdateImage = styled.div`
    border: none;
    display: none;
    outline: none;
    position: absolute;
    // right: -15px;
    top: -15px;
    transition: .3s;
    right: 30px;
    &:hover{
        transform: scale(.95);
    }
` 

const DeleteImage = styled.div`
    border: none;
    display: none;
    outline: none;
    position: absolute;
    right: -15px;
    top: -15px;
    transition: .3s;
    &:hover{
        transform: scale(.95);
    }
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
    &:hover ${UpdateImage}, &:hover ${DeleteImage} {
        display: block;
    }
`

function ImageList({updateAlbum, visibleAlbum, closeAlbum, db}){
    const [isFormVisible, setFormVisible] = useState(false);
    const [visibleImage, setVisibleimage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [updatingImage, setUpdatingImage] = useState(null);


    const imageNameInput = useRef();
    const imageUrlInput = useRef();

     function showHideForm(){
        setFormVisible(!isFormVisible);
        if(updatingImage!=null){
            setUpdatingImage(null);
            console.log(updatingImage);
        }
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
          url: ImageUrl,
          id: new Date().getTime()
        };
      
        updateAlbum(image, visibleAlbum.id);
        clearInput();
        setFormVisible(false);
      }

    const clearInput = () => {
        imageNameInput.current.value = "";
        imageUrlInput.current.value = "";
    };
    
    async function updateImage(e){
        e.preventDefault();
        const ImageName = imageNameInput.current.value;
        const ImageUrl = imageUrlInput.current.value;
        const updatedImage = {
            name: ImageName,
            url: ImageUrl,
            id: updatingImage.id
        }

        const imageIndex = visibleAlbum.imageList.findIndex(img => img.id === updatedImage.id);
        if(imageIndex === -1){
            console.error("Image not found in the album.");
        }

       

        const updatedImageList = [...visibleAlbum.imageList];
        updatedImageList[imageIndex] = updatedImage;

        try{
            // Update the component's state
            const albumRef = doc(db, "albums", visibleAlbum.id);
            await updateDoc(albumRef, {
                imageList: updatedImageList
            });

            // Update the component's state
            // updateAlbum({ ...visibleAlbum, imageList: updatedImageList });

            setUpdatingImage(null);
            setFormVisible(false);
        }catch(error){

            console.erro("Error Updating image:", error);
        }



        // const albumRef = doc(db, "albums", visibleAlbum.id);
    
        // // Set the "capital" field of the city 'DC'
        // await updateDoc(albumRef, {
        //     // imageList: arrayUnion(image)
        // });

        
    }

    function setImageToUpdate(image){
        setUpdatingImage(image);
        setFormVisible(true);
    }

    function openImage(image){
        if(visibleImage==null){
            const index = visibleAlbum.imageList.findIndex(img => img.id === image.id);
            setCurrentImageIndex(index);
            setVisibleimage(image);
        }
    }

    function goToNextImage() {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % visibleAlbum.imageList.length);
    }

    function goToPreviousImage() {
        setCurrentImageIndex(prevIndex =>
            prevIndex === 0 ? visibleAlbum.imageList.length - 1 : prevIndex - 1
        );
    }
    

    function closeImage(){
        if(visibleImage!=null){
            setVisibleimage(null);
        }
    }

    async function deleteImage(imageId) {
        const imageIndex = visibleAlbum.imageList.findIndex(img => img.id === imageId);
        if (imageIndex === -1) return; // Image not found in the album

        const updatedImageList = [...visibleAlbum.imageList];
        updatedImageList.splice(imageIndex, 1); // Remove the image from the list

        try {
            // Update the album's imageList in the database
            const albumRef = doc(db, "albums", visibleAlbum.id);
            await updateDoc(albumRef, {
                imageList: updatedImageList
            });

            // Delete the image document from the images collection
            const imageDocRef = doc(db, "images", imageId);
            await deleteDoc(imageDocRef);

            // Update the component's state
            updateAlbum({ ...visibleAlbum, imageList: updatedImageList });
        } catch (error) {
            console.error("Error deleting image:", error);
        }

    }        
    return(
        <ImageListContainer>
            {
                visibleImage!=null? 
                <ImageCarousel>
                    <CloseButton onClick={closeImage}>X</CloseButton>
                    <PreviousImage onClick={goToPreviousImage}>&lt;</PreviousImage>
                    <CarouselLargeImage src={visibleAlbum.imageList[currentImageIndex].url}/>
                    <NextImage onClick={goToNextImage}>&gt;</NextImage>
                </ImageCarousel>:null            
            }
            
            <ImageListTop>
                <BackOption onClick={closeAlbum}>
                    <BackImage src="https://cdn-icons-png.flaticon.com/128/7915/7915208.png"></BackImage>
                </BackOption>
                <Heading>{visibleAlbum.imageList.length>0 ?"images in " + visibleAlbum.name:"No images found in the " + visibleAlbum.name}</Heading>
                {isFormVisible? <CancelButton onClick={showHideForm}>Cancel</CancelButton>:
                                <AddButton onClick={showHideForm}>Add image</AddButton>}
                
            </ImageListTop>
            {
                isFormVisible? 
                <ImageFormContainer>
                    <Heading>{updatingImage!=null?"Update image "+updatingImage.name:"Add image to album"}</Heading>
                    <ImageForm onSubmit={(e)=>{updatingImage!=null? updateImage(e):onSubmitHandler(e)}}>
                        <InputText ref={imageNameInput} 
                            required placeholder="Title" defaultValue={updatingImage!=null? updatingImage.name: null}/>
                        <InputText ref={imageUrlInput}
                            required placeholder="Image URL" defaultValue={updatingImage!=null? updatingImage.url: null}/>
                        <FormBottom>
                            <ClearButton onClick={clearInput} type="button">Clear</ClearButton>
                            <CreateButton>{updatingImage!=null?"Update":"Add"}</CreateButton>
                        </FormBottom>
                    </ImageForm>
                </ImageFormContainer>:null
            }

            <Images>
                {
                    visibleAlbum.imageList.map((image)=>
                     <ImageElemet key={image.id}>
                        <UpdateImage onClick={()=>{setImageToUpdate(image)}}>
                            <img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" style={{width:"35px"}} alt="Edit"/>
                        </UpdateImage>
                        <DeleteImage onClick={()=>{deleteImage(image.id)}}>
                            <img src="https://cdn-icons-png.flaticon.com/128/5028/5028066.png" style={{width:"35px"}} alt="Edit"/>
                        </DeleteImage>
                        <Image onClick={()=>{openImage(image)}} key={image.id} id={image.id} src={image.url} alt='image'/>
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

// https://cdn-icons-png.flaticon.com/128/8417/8417111.png
// https://cdn-icons-png.flaticon.com/128/10336/10336582.png