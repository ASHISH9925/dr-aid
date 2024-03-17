import { Slot } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient()

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>

    <ScrollView>
      <SafeAreaView style={{ padding: 10 }}>
        <Slot />
      </SafeAreaView>
      </ScrollView>
      </QueryClientProvider>
  );
}
