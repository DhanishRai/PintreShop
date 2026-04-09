"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  Package, 
  ExternalLink,
  Save,
  X,
  Image as ImageIcon,
  Upload,
  Tag,
  Type,
  AlignLeft,
  DollarSign,
  Link as LinkIcon
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  affiliateLink: string;
  aspectRatio?: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    affiliateLink: "",
  });
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, image: data.url });
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else if (response.status === 401) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // In a real app we'd call an API to clear the cookie
    // For this simple demo, we'll just redirect
    router.push("/admin");
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
      affiliateLink: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      affiliateLink: product.affiliateLink,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProduct 
      ? `/api/products/${editingProduct.id}` 
      : "/api/products";
    const method = editingProduct ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-outfit">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black flex items-center gap-3">
            <Package className="text-primary w-10 h-10" />
            Product Management
          </h1>
          <p className="text-foreground/40 mt-2 font-medium">Manage your affiliate trends and data</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_30px_rgba(230,0,35,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
          
          <button 
            onClick={handleLogout}
            className="glass flex items-center justify-center w-12 h-12 rounded-2xl text-foreground/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="glass-card group p-5 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col h-full">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white/5">
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    fill 
                    className="object-cover"
                    sizes="300px"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button 
                      onClick={() => openEditModal(product)}
                      className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                    {product.category}
                  </span>
                  <span className="text-primary font-bold text-sm ml-auto">{product.price}</span>
                </div>
                
                <p className="text-xs text-foreground/40 line-clamp-2 mb-4 flex-grow">{product.description}</p>
                
                <a 
                  href={product.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto glass w-full py-3 rounded-xl text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                >
                  View Link <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 glass rounded-[3rem] border border-dashed border-white/10">
            <Package className="w-20 h-20 text-foreground/10 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground/40">No products found</h2>
            <p className="text-foreground/20 mt-2">Start by adding your first affiliate product</p>
            <button 
              onClick={openAddModal}
              className="mt-8 text-primary font-bold uppercase tracking-widest text-sm hover:underline"
            >
              Add Product Now
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-white/10 p-8 md:p-12 relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-foreground/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              {editingProduct ? "Edit Product" : "Add New Trend"}
            </h2>
            <p className="text-foreground/40 mb-10">Fill in the details below to update your grid</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1 flex items-center gap-2"><Type className="w-3 h-3" /> Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: Minimalist Keyboard"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1 flex items-center gap-2"><DollarSign className="w-3 h-3" /> Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: $129.99"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1 flex items-center gap-2"><AlignLeft className="w-3 h-3" /> Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-none"
                  placeholder="Tell more about the product..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1 flex items-center gap-2"><Tag className="w-3 h-3" /> Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Ex: Tech, Lifestyle"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" /> Image (URL or Upload)
                </label>
                <div className="flex gap-4">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="https://images.unsplash.com/... or upload"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="file-upload"
                      className={`h-full aspect-square flex items-center justify-center glass border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-all ${uploading ? 'opacity-50' : ''}`}
                    >
                      {uploading ? (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-5 h-5 text-primary" />
                      )}
                    </label>
                  </div>
                </div>
                {formData.image && (
                  <div className="mt-4 relative w-32 aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1 flex items-center gap-2"><LinkIcon className="w-3 h-3" /> Affiliate Link</label>
                <input
                  type="url"
                  value={formData.affiliateLink}
                  onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="https://amazon.com/..."
                  required
                />
              </div>

              <div className="md:col-span-2 pt-6">
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(230,0,35,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingProduct ? "Update Product" : "Publish Trend"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
