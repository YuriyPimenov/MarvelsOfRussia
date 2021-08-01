
export default class ManagerDom {
  constructor({regionTitleSelector}) {
    this.regionTitle = document.getElementById(regionTitleSelector) || null

    if (!this.regionTitle) {
      throw new Error('Title is wrong')
    }
  }


}