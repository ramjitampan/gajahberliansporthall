import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export default function ScrollToHash(){const{pathname,hash}=useLocation();useEffect(()=>{if(!hash){window.scrollTo({top:0,behavior:'smooth'});return}const id=window.setTimeout(()=>document.getElementById(hash.slice(1))?.scrollIntoView({behavior:'smooth',block:'start'}),80);return()=>window.clearTimeout(id)},[pathname,hash]);return null}
