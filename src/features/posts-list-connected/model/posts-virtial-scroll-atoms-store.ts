import { atom } from "jotai";

//  maintains the last loaded page in infinite scroll of posts
export const virtualScrollPageAtom = atom(0);

//  maintains the last clicked post item index
//  is used to scroll into this item if user goes back to the posts-list-page
export const lastVisitedPostDetailsIdAtom = atom<number | null>(null);
