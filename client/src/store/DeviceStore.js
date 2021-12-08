import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
	constructor() {
		this._types = []
		this._brands = []
		this._devices = []
		this._selectedType = {}
		this._selectedBrand = {}
		this._page = 1 // поле отвечает за текущую страницу
		this._totalCount = 0 // общее количество товаров
		this._limit = 4 // количество товаров на 1 странице
		makeAutoObservable(this) // уловить существующие свойства объекта
	}
	setTypes(types) {
		this._types = types
	}
	setBrands(brands) {
		this._brands = brands
	}
	setDevises(devices) {
		this._devices = devices
	}
	setSelectedType(type) {
		this.setPage(1)
		this._selectedType = type
	}
	setSelectedBrand(brand) {
		this.setPage(1)
		this._selectedBrand = brand
	}
	setPage(page) {
		this._page = page
	}
	setTotalCount(count) {
		this._totalCount = count
	}
	get types() {
		return this._types
	}
	get brands() {
		return this._brands
	}
	get devices() {
		return this._devices
	}
	get selectedType() {
		return this._selectedType
	}
	get selectedBrand() {
		return this._selectedBrand
	}
	get totalCount() {
		return this._totalCount
	}
	get page() {
		return this._page
	}
	get limit() {
		return this._limit
	}
}
