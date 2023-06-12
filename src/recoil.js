import { atom ,selector,useRecoilState} from "recoil"
export const firstNameAtom = atom({
    key:"firstnameatom1111",
    default:5
})
export const lastNameAtom = atom({
    key: 'lastnameatom8888',
    default: 0
  });
export const howChangeFirstName = atom({
    key: 'howChangeFirstName',
    default: "jia"
  });
  export const changeLastName=selector({
    key:"changeLastName",
    get:({get})=>{
        const num=get(lastNameAtom)
        const Howchange=get(howChangeFirstName)

        // return num+1
        switch (Howchange) {
            case 'jia':
              console.log('jia');
                return num+1
            case 'jian':
              console.log('jian');
        return num-1
            default:
                return num;
        }
    },
    set:({get,set},value)=>{

    }

  })