import { onSnapshot } from "mobx-state-tree";
import { RootModal } from ".";

/*
    This will create root Tree instance and we provide that instance in app.ts

*/

export const setupRootStore = () => {

    // creating the instance using .create method and passing and object with values which are fake
    const rootTree = RootModal.create({
        employer:{
            id: '1',
            name: 'Nitesh Shetye',
            location: 'Virar, East',
            employee: []
        }
    })

    // (run) take snap shot when state changes from store 
    onSnapshot(rootTree, (snapshot) => console.log('SnapShot: ', snapshot))

    // // get current snap shot of rootTree
    // const currentRootTree = getSnapshot(rootTree)

    // // responsible to change the state
    // applySnapshot(rootTree, { 
    //     ...currentRootTree,
    //     employer: {...currentRootTree.employer, location: 'Dahisar'}
    // })

    return { rootTree }
}