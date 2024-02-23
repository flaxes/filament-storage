interface Filament {
    name: string;
    type: string;
    brand: string;
    color: string; // hex
    price: number;
    amount: number;
    created_at: number;
    updated_at: number;
}

interface Store {
    filaments: Record<number, Filament>;
    lastIndex: number;
    brands: Record<string, string>;
    types: Record<string, string>;
}
