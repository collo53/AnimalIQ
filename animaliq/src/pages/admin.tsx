import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Plus,
  Image,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Forum from "./Forum";

interface AnimalData {
  id?: string;
  name?: string;
  habitat?: string;
  description?: string;
  size?: string;
  diet?: string;
  lifespan?: string;
  facts?: string[];
  conservationStatus?: string;
  category?: string;
  image?: File; 
}

const AddPhotoForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast({ title: "Please enter a title and select a file." });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      await axios.post("https://animals-production-13e6.up.railway.app/animals/gallery/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ title: "Photo uploaded successfully!" });
      setTitle("");
      setFile(null);
    } catch (err) {
      toast({ title: "Upload failed.", description: err.message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Upload Photo to Gallery
        </CardTitle>
        <CardDescription>Add images to be displayed on the site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Image Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Polar Bear in Snow" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <Button className="w-full" onClick={handleUpload}>Upload Photo</Button>
      </CardContent>
    </Card>
  );
};



const ForumChat = () => (
  <div className="min-h-screen bg-gray-50">
    <Forum />
  </div>
);

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("animals");

  const [selectedCategory, setSelectedCategory] = useState("forest-animals");
  const [formData, setFormData] = useState<Partial<AnimalData>>({
    name: "",
    habitat: "",
    description: "",
    size: "",
    diet: "",
    lifespan: "",
    facts: [],
    conservationStatus: "Least Concern",
    category: "forest-animals",
    image: undefined,

  });

  const categories = [
    { value: "forest-animals", label: "Forest Animals" },
    { value: "ocean-animals", label: "Ocean Animals" },
    { value: "savanna-animals", label: "Savanna Animals" },
    { value: "arctic-animals", label: "Arctic Animals" },
    { value: "endangered-animals", label: "Endangered Animals" },
  ];

  const conservationStatuses = [
    "Least Concern",
    "Near Threatened",
    "Vulnerable",
    "Endangered",
    "Critically Endangered",
  ];

 const handleAddAnimal = async () => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("habitat", formData.habitat || "");
  data.append("description", formData.description);
  data.append("size", formData.size || "");
  data.append("diet", formData.diet || "");
  data.append("lifespan", formData.lifespan || "");
  data.append("facts", JSON.stringify(formData.facts)); 
  data.append("conservation_status", formData.conservationStatus || "Least Concern"); 
  data.append("category", formData.category || "General");
  if (formData.image) {
    data.append("image", formData.image);
  }

  try {
    const response = await axios.post("https://animals-production-13e6.up.railway.app/animals/animals/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Animal added successfully:", response.data);
    toast({ title: "Animal added successfully!" });
  } catch (error) {
    toast({ title: "Failed to add animal", description: error.response?.data?.detail || "Please try again later.", variant: "destructive" });
    console.error("Error Response:", error.response.data);
    console.error("Error: Failed to add animal");
    console.log("Facts sending as:", JSON.stringify(formData.facts));

  }
};




  const handleFactsChange = (factsString: string) => {
    const factsArray = factsString
      .split(",")
      .map((fact) => fact.trim())
      .filter((fact) => fact.length > 0);
    setFormData({ ...formData, facts: factsArray });
  };

  return (
    <div className="min-h-screen bg-blue-300">
      {/* Header */}
      <section className="py-16 px-6 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex items-center justify-center mb-6">
            <Settings className="h-12 w-12 mr-4 text-accent" />
            <h1 className="text-5xl md:text-6xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed">
            Manage animal facts, photos, and forum discussions.
          </p>
        </div>
      </section>

      <section className="px-6 pt-10">
        <div className="max-w-4xl mx-auto flex gap-4">
          {[
            { label: "Add Animal", key: "animals", icon: Plus },
            { label: "Add Photo", key: "gallery", icon: Image },
            { label: "Forum", key: "chat", icon: MessageCircle },
          ].map(({ label, key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm font-semibold ${
                activeTab === key
                  ? "bg-white text-blue-600 shadow"
                  : "bg-white/30 text-white/80 hover:bg-white/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {activeTab === "animals" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Animal
                </CardTitle>
                <CardDescription>
                  Add new animal facts and information to be displayed to users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setFormData({ ...formData, category: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Animal Name *</label>
                    <Input
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Brown Bear"
                    />
                  </div>
                  <div>
                      <label className="block text-sm font-medium mb-2">Animal Image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setFormData({ ...formData, image: e.target.files[0] });
                          }
                        }}
                      />
                    </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Habitat</label>
                    <Input
                      value={formData.habitat || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, habitat: e.target.value })
                      }
                      placeholder="e.g., Temperate Forest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Detailed description..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <Input
                      value={formData.size || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      placeholder="e.g., 1.5m, 500kg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Diet</label>
                    <Input
                      value={formData.diet || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, diet: e.target.value })
                      }
                      placeholder="e.g., Omnivore"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Lifespan</label>
                    <Input
                      value={formData.lifespan || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, lifespan: e.target.value })
                      }
                      placeholder="e.g., 25 years"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Conservation Status
                  </label>
                  <Select
                    value={formData.conservationStatus}
                    onValueChange={(value) =>
                      setFormData({ ...formData, conservationStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conservationStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Amazing Facts</label>
                  <Textarea
                    value={formData.facts?.join(", ") || ""}
                    onChange={(e) => handleFactsChange(e.target.value)}
                    placeholder="e.g., Can run 50 km/h, Hibernates 7 months"
                    className="min-h-[80px]"
                  />
                </div>

                {formData.facts && formData.facts.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Facts Preview
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.facts.map((fact, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {fact}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={handleAddAnimal} className="w-full" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Animal to {categories.find((c) => c.value === selectedCategory)?.label}
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "gallery" && <AddPhotoForm />}
          {activeTab === "chat" && <ForumChat />}
        </div>
      </section>
    </div>
  );
};

export default Admin;
