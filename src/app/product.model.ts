export class Product {
    public Id: number;
    public Title: string;
    public Price: number;
    public Description: string;
    public ImageSrc: string;

    constructor(id: number, title: string, price: number, description: string, imageSrc: string){
        this.Id = id;
        this.Title = title;
        this.Price = price;
        this.Description = description;
        this.ImageSrc = imageSrc;
    }
}