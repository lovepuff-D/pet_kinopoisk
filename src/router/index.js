import {createRouter, createWebHistory} from 'vue-router'
import Movies_Catalog from "@/components/Movies_Catalog";
import Movie_Item from "@/components/Movie_Item";
import Movie_Item_Full from "@/components/Movie_Item_Full"
import Movie_Awards_From_Tab from "@/page/Movie_Awards_From_Tab";
import Movie_Distributions_From_Tab from "@/page/Movie_Distributions_From_Tab";
import Movie_Gallery_From_Tab from "@/page/Movie_Gallery_From_Tab";
//import Movie_Similar_From_Tab from "@/page/Movie_Similar_From_Tab";
import Movie_Reviews_From_Tab from "@/page/Movie_Reviews_From_Tab"

import Main_Page from "@/page/Page_Main";
import Catalog from "@/page/Page_Of_Movies-Catalog";
import AdvancedSearch_Form from "@/page/Page_AdvancedSearch_Form";
import AdvancedSearch_List from "@/page/Page_AdvancedSearch_List";

import Person_Item from "@/components/Person_Item";

import NotFound from "@/components/404";

const routes = [
    {
        path: '',
        component: Main_Page,
        name: 'Main',
    },
    {
        path: '/Catalog',
        component: Catalog,
        name: 'Catalog',
    },
    {
        path: '/:id/film',
        name: 'Full-Item',
        component: Movie_Item_Full,
    },
    {
        path: '/:id/person/',
        name: 'Person',
        component: Person_Item,
    },
    {
        path: '/:id/awards',
        name: 'Awards',
        component: Movie_Awards_From_Tab,
    },
    {
        path: '/:id/distributions',
        name: 'Distributions',
        component: Movie_Distributions_From_Tab,
    },
    {
        path: '/:id/gallery',
        name: 'Gallery',
        component: Movie_Gallery_From_Tab,
    },
    /*{
        path: '/:id/similar',
        name: 'Similar',
        component: Movie_Similar_From_Tab,
    },*/
    {
        path: '/:id/reviews',
        name: 'Reviews',
        component: Movie_Reviews_From_Tab,
    },
    {
        path: '/advancedSearch/form',
        name: 'AdvancedSearch_Form',
        component: AdvancedSearch_Form,
    },
    {
        path: '/advancedSearch/list',
        name: 'AdvancedSearch_List',
        component: AdvancedSearch_List,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
