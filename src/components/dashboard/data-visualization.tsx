"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getVisualization } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";

const formSchema = z.object({
  dataType: z.string().min(1, "Data type is required."),
  dataValues: z.string().min(1, "Data values are required.").refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, { message: "Must be valid JSON." }),
  visualizationType: z.string().min(1, "Visualization type is required."),
});

export function DataVisualization() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataType: "blue carbon levels",
      dataValues: JSON.stringify([
        { "location": "Sundarbans", "year": 2020, "carbon_stored_tons": 50000 },
        { "location": "Sundarbans", "year": 2021, "carbon_stored_tons": 48000 },
        { "location": "Pichavaram", "year": 2021, "carbon_stored_tons": 35000 }
      ], null, 2),
      visualizationType: "bar chart",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('dataType', values.dataType);
    formData.append('dataValues', values.dataValues);
    formData.append('visualizationType', values.visualizationType);

    const response = await getVisualization(formData);

    setIsLoading(false);

    if (response.error) {
      toast({ variant: "destructive", title: "Error", description: response.error });
    } else if (response.visualization) {
      setResult(response.visualization);
    }
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          AI-Powered Data Visualization
        </CardTitle>
        <CardDescription>
          Use AI to generate insights and summaries from environmental data.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dataType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a data type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blue carbon levels">Blue Carbon Levels</SelectItem>
                      <SelectItem value="pollution reports">Pollution Reports</SelectItem>
                      <SelectItem value="storm surges">Storm Surges</SelectItem>
                      <SelectItem value="sea levels">Sea Levels</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="visualizationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visualization Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a visualization type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bar chart">Bar Chart</SelectItem>
                      <SelectItem value="map">Map</SelectItem>
                      <SelectItem value="table">Table</SelectItem>
                      <SelectItem value="line graph">Line Graph</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataValues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Values (JSON)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your data in JSON format" className="h-40 font-mono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Visualization
            </Button>
          </form>
        </Form>
        <div className="flex flex-col rounded-lg border bg-muted/30 p-4">
            <h3 className="mb-2 font-semibold text-foreground">Generated Insights</h3>
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Generating... Please wait.</p>
                    </div>
                </div>
            ) : result ? (
                <div className="prose prose-sm max-w-none text-muted-foreground">{result}</div>
            ) : (
                <div className="flex flex-1 items-center justify-center">
                    <p className="text-center text-muted-foreground">Your AI-generated visualization summary will appear here.</p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
