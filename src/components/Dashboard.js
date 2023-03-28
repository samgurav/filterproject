import React from 'react'
import axios from 'axios';
import './dashboard.css'
import {useState,useEffect,useRef} from 'react'
import Products from '../server/products.json'
import { Link,useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"; 
import { TabContainer,Card,Container,Row,Button } from 'react-bootstrap'
 const Dashboard = () => {
    const[data,setData]=useState([]);
    const[item,setItem]=useState(Products.products);
    const searchInput = useRef(null);
    const navigate=useNavigate()
    const [flag,setFlag]=useState(false)
    const filterItem=(products)=>{
        
            const updatedItems=Products.products.filter((curEle)=>{
                console.log(curEle.pname)
                return curEle.pname==products;

            })
            setItem(updatedItems)



    }
    const Logout=()=>{
   
        sessionStorage.clear()
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to logout from this Device",
            icon: 'warning',  
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Logout',
                'success'
              )
            }
          })
        setFlag(true)
      
       
      }
    const showall=()=>{
        axios.get('http://localhost:3003/All')
            .then(res=>{
                console.log("Get All")
                setItem(res.data)
            
            })
        }
        const searchProduct=()=>{
            let arr=[];
            axios.get('http://localhost:3003/All')
            .then(res=>{
                arr=res.data;
                console.log(arr)
                let selectedproduct=arr.filter((value)=>{
                  if(searchInput.current.value === ""){
                      return value
                  }
                  else if(value.pname.toLowerCase().includes(searchInput.current.value.toLowerCase()))
                  {
                      return value
                  }
                })
                setItem(selectedproduct)
            })
        }
 
    const url=' http://localhost:3003/products'
    useEffect(()=>{
        axios.get(url)
        .then(response=>{
            console.log(Products.products)
            console.log(response.data)
            setData(response.data)
        })
    },[])
    return (
        <div style={{backgroundColor:'#F7D8E6'}}>
        <h1 className=" text-center main-heading" style={{fontStyle:"italic",fontsize:'50px'}}>Our <span style={{fontSize:'50px' ,fontStyle:'italic',  color:'#9E0A7E',fontWeight:'bold'}}>Store</span></h1><hr/>
         <div className="menu-tabs container">
             <div className="menu-tab d-flex justify-content-around">
                 <button className="btn btn-danger"  onClick={()=>showall()}>All</button>
                 <button className="btn btn-danger" onClick={()=>filterItem('cake')}>Cakes</button>
                 <button className="btn btn-danger" onClick={()=>filterItem('cupcake')}>CupCakes</button>
                 <button className="btn btn-danger"onClick={()=>filterItem('sweets')}>Sweets</button>
                 <button className="btn btn-danger" onClick={()=>filterItem('doughnuts')}>Doughnuts</button>
                 <button className="btn btn-danger" onClick={()=>filterItem('pestries')} >Pestries</button>
                 <button className="btn btn-danger"  onClick={()=>filterItem('chocolate')}>Chocolates</button>
                 <button className="btn btn-Dark" onClick={Logout} >Logout</button>
                 {flag? navigate('/'):null}  
                     </div></div>   <br/>

                     <TabContainer >
                         <div className="container" >
                      
                             <form>
                                 <input className="form-control me-2 "  name="Product" type="text"
                                  placeholder="Search Your Favourite and delicious Product...." 
                                  aria-label="search" ref={searchInput} onChange={searchProduct}/>
                                  
                             </form>
                         </div>
            <Container >
                    
                <Row>
                {item.map(( elem)=>{
                             const{ id,images,pname,price,image}=elem
               return(
               
               
                <Card className="col-lg-4 my-5 " key={id} style={{marginTop:'20px',padding:'10px'}}>
         <div className="wrapper">
          <div className="hover-animation">
              <figure>
            <img variant="top" src={images}  className="back" width="350px" height="350px" style={{padding:'10px'}}/>
            <img variant="top" src={image}  className="front" width="350px" height="350px" style={{padding:'10px'}}/>
       
        </figure>
          </div>
          </div>
             <Card.Body>
            <Card.Title style={{fontStyle:'italic',fontWeight:'bold',fontsize:'35px', color:'#A91372'}}> {pname}</Card.Title>
            <Card.Text>
         
          <span style={{color:"black",fontSize:'16px', fontStyle:'italic',fontWeight:'bold'}}>    Price: Rs.{price} </span>
                    
            </Card.Text>
            <Button variant="warning">Order Now</Button>
            </Card.Body>
            </Card>
    
            
               )
               }
            )}
           
            </Row>
            
              
            </Container>
        </TabContainer>       
   
        </div>
    )
}
export default Dashboard
